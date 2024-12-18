"""
Flask application with Firebase-related logic commented out and adhering to Pylint guidelines.
"""

from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os

# import firebase_admin
# from firebase_admin import credentials, firestore
from google import genai
from google.genai.types import Tool, GenerateContentConfig, GoogleSearch  # type: ignore

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Firebase setup - commented out
# firebase_key_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY")
# if not firebase_key_path or not os.path.exists(firebase_key_path):
#     raise FileNotFoundError("Firebase service account key file not found")

# print(f"Firebase service account key file found at {firebase_key_path}")
# cred = credentials.Certificate(firebase_key_path)
# firebase_admin.initialize_app(cred)
# db = firestore.client()
# print("Firestore client initialized")

# Initialize GenAI client
client = genai.Client(
    vertexai=True,
    project=os.getenv("GOOGLE_CLOUD_PROJECT"),
    location=os.getenv("GOOGLE_CLOUD_LOCATION"),
)


@app.after_request
def add_cors_headers(response):
    """
    Add CORS headers to the response.
    """
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response


def prepare_prompt(user_input):
    """
    Prepare a prompt for the GenAI client.
    """
    return user_input


# @app.route("/register", methods=["POST"])
# def register_user():
#     """
#     Register a new user.
#     """
#     try:
#         data = request.get_json()
#         username = data.get("username")
#         email = data.get("email")

#         if not username or not email:
#             return jsonify({"error": "Username and email are required."}), 400

#         # Save to Firestore - commented out
#         # doc_ref = db.collection('users').document(username)
#         # doc_ref.set({
#         #     'username': username,
#         #     'email': email,
#         #     'created_at': firestore.SERVER_TIMESTAMP
#         # })

#         return jsonify({"message": "User registered successfully."}), 201
#     except Exception as err:
#         return jsonify({"error": str(err)}), 500


@app.route("/generate", methods=["POST"])
def generate_content():
    """
    Generate content using the GenAI client.

    """

    try:
        data = request.get_json()
        user_input = data.get("input")

        if not data or 'input' not in data:
            return jsonify({"error": "Invalid input, 'input' field is required"}), 400

        prompt = prepare_prompt(user_input)

        # Generate content using GenAI
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp", contents=prompt
        )

        return jsonify({"content": response.text})
    except Exception as err:
        return jsonify({"error": str(err)}), 500


@app.route("/live-generate", methods=["POST"])
def live_generate_content():
    """
    Generate content in real-time using the GenAI client.
    """
    try:
        data = request.get_json()
        user_input = data.get("input")

        if not user_input:
            return jsonify({"error": "Input is required."}), 400

        prompt = prepare_prompt(user_input)

        import asyncio

        async def live_session():
            async with client.aio.live.connect(
                model="gemini-2.0-flash-exp", config={"response_modalities": ["TEXT"]}
            ) as session:
                await session.send(prompt, end_of_turn=True)
                async for response in session.receive():
                    return response.text

        generated_text = asyncio.run(live_session())
        return jsonify({"content": generated_text})
    except Exception as err:
        return jsonify({"error": str(err)}), 500


@app.route("/search-generate", methods=["POST"])
def search_generate_content():
    """
    Generate content with search grounding using the GenAI client.
    """
    try:
        data = request.get_json()
        user_input = data.get("input")

        if not user_input:
            return jsonify({"error": "Input is required."}), 400

        prompt = prepare_prompt(user_input)

        google_search_tool = Tool(google_search=GoogleSearch())
        config = GenerateContentConfig(
            tools=[google_search_tool], response_modalities=["TEXT"]
        )

        response = client.models.generate_content(
            model="gemini-2.0-flash-exp", contents=prompt, config=config
        )

        content = response.text
        grounding_metadata = ""
        if (
            response.candidates
            and response.candidates[0].grounding_metadata
            and response.candidates[0].grounding_metadata.search_entry_point
        ):
            grounding_metadata = response.candidates[
                0
            ].grounding_metadata.search_entry_point.rendered_content

        return jsonify({"content": content, "grounding": grounding_metadata})
    except Exception as err:
        return jsonify({"error": str(err)}), 500


@app.route("/generate-image", methods=["POST"])
def generate_image():
    """
    Generate an image based on user input using the GenAI client.
    """
    try:
        data = request.get_json()
        user_input = data.get("input")

        if not user_input:
            return jsonify({"error": "Input is required."}), 400

        prompt = f"Generate an image based on the description: {user_input}."
        config = GenerateContentConfig(response_modalities=["IMAGE"])

        response = client.models.generate_content(
            model="gemini-2.0-flash-exp", contents=prompt, config=config
        )

        image_url = (
            response.image_url
            if hasattr(response, "image_url")
            else "No image_url field."
        )
        return jsonify({"image_url": image_url})
    except Exception as err:
        return jsonify({"error": str(err)}), 500
 
#for prod 
if __name__ == "__main__":
    PORT = int(os.getenv("PORT", 8000))
    app.run(host="0.0.0.0", port=PORT)

