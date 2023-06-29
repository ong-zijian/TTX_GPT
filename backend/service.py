import PyPDF2
import openai
from flask_cors import CORS

from werkzeug.utils import secure_filename

from flask import Flask, request, jsonify

app = Flask(__name__)

CORS(app)

context = ""

def read_pdf(file_path):
    global context  
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in range(len(reader.pages)):
            text += reader.pages[page].extract_text()
        context = text
        return text

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return 'No file found', 400

    file = request.files['file']
    if file.filename == '':
        return 'No file selected', 400

    try:
        filename = secure_filename(file.filename)
        file_path = 'uploads/' + filename
        file.save(file_path)
        extracted_text = read_pdf(file_path)
        return extracted_text
    except Exception as e:
        return str(e), 500
    
openai.api_key = ''


# Generate improvement suggestions using OpenAI GPT-3
def evaluate(answer, question):
    prompt = "Based on this context:" + context + "For the question of: " + question + " and with this answer given" + answer + "Please rate from 1-10, say what went well and what can be improved."

    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=prompt,
        temperature=0.7,
        max_tokens=100,
        n=3,  # Number of suggestions to generate
        stop=None
    )

    suggestions = [choice['text'].strip() for choice in response.choices]
    return suggestions

@app.route('/evaluate', methods=['POST'])
def evaluate_route():
    data = request.get_json()
    #content = data.get('content')
    answer = data.get('answer')
    question = data.get('question')

    if not all([answer, question]):
        return jsonify(error='Invalid request data'), 400

    suggestions = evaluate(answer, question)
    return jsonify(suggestions=suggestions)

def final_evaluate(answers):
    prompt = "Based on the following evaluation, give a rating and give an overall comment of the user's performance:\n"

    for answer in answers:
        prompt += answer + "\n\n"  # Add two line breaks after each answer

    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=prompt,
        temperature=0.7,
        max_tokens=200,
        n=3,
        stop=None
    )

    finalEvaluation = [choice['text'].strip() for choice in response.choices]
    return finalEvaluation

@app.route('/final_evaluate', methods=['POST'])
def evaluate_final():
    data = request.get_json()
    #content = data.get('content')
    answer = data.get('answer')

    if not all([answer]):
        return jsonify(error='Invalid request data'), 400

    print("Received answer:", answer) 
    finalEvaluation = final_evaluate(answer)
    return jsonify(finalEvaluation=finalEvaluation)


if __name__ == '__main__':
    app.run(port=5001, debug=True)

