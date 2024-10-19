from flask import Flask, request, send_file
from flask_cors import CORS
import os
import pickle
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

logging.basicConfig(level=logging.DEBUG)

# Path where the processed subtitle will be saved temporarily
OUTPUT_PATH = os.path.expanduser("~/Downloads/adjusted_subtitles.srt")

# Load your .pkl file (from Downloads folder)
PKL_PATH = os.path.expanduser("~/Downloads/audio_segments_output (1).pkl")
with open(PKL_PATH, 'rb') as f:
    model = pickle.load(f)

@app.route('/process', methods=['POST', 'OPTIONS'])
def process_files():
    if request.method == 'OPTIONS':
        # Handling preflight request
        response = app.make_default_options_response()
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    logging.debug(f"Received request: {request.files}")
    if 'video' not in request.files or 'subtitle' not in request.files:
        return {"error": "Both video and subtitle files are required"}, 400

    video_file = request.files['video']
    subtitle_file = request.files['subtitle']

    # Save files temporarily if needed
    video_path = os.path.join("uploads", video_file.filename)
    subtitle_path = os.path.join("uploads", subtitle_file.filename)
    video_file.save(video_path)
    subtitle_file.save(subtitle_path)

    # Process the video and subtitle with your model
    process_video_and_subtitle(video_path, subtitle_path, OUTPUT_PATH)

    # Return the new subtitle file to the frontend
    return send_file(OUTPUT_PATH, as_attachment=True)

def process_video_and_subtitle(video_path, subtitle_path, output_path):
    with open(subtitle_path, 'r') as srt_file:
        subtitles = srt_file.read()

    new_subtitles = model.process(subtitles)

    with open(output_path, 'w') as f:
        f.write(new_subtitles)

if __name__ == '__main__':
    app.run(debug=True)