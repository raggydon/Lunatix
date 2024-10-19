# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define the processing function
def process_files(video_path, subtitle_path):
    # Import your model here and call the processing function
    # For example, assume you have a function `run_model(video_path, subtitle_path)`

    # Dummy implementation for processing
    # In a real scenario, you would call your model and return the output
    output_file_path = f"output/{os.path.basename(video_path)}_processed.mp4"
    
    # Simulate processing
    print(f"Processing video: {video_path} with subtitles: {subtitle_path}")
    # Here you would integrate your model processing logic

    return output_file_path

@app.route('/process-files', methods=['POST'])
def process_files_endpoint():
    data = request.json
    video_file_path = data.get('videoFilePath')
    subtitle_file_path = data.get('subtitleFilePath')

    try:
        output_file = process_files(video_file_path, subtitle_file_path)
        return jsonify({"message": "Processing complete", "outputFilePath": output_file}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Processing failed", "error": str(e)}), 500

if __name__ == '__main__':
    if not os.path.exists('output'):
        os.makedirs('output')  # Create output directory if it doesn't exist
    app.run(debug=True)
