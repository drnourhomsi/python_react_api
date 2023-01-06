import openai
from flask import Flask, request
from flask_cors import cross_origin

app = Flask(__name__)

@app.route("/ask", methods=["GET"])
@cross_origin()
def ask():
    openai.api_key = "[YOUR_API_KEY_HERE]"
    
    completions = openai.Completion.create(
        engine="text-davinci-003",
        prompt=request.args['q'],
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )
    
    message = completions.choices[0].text
    return {"answers": message}
    
if __name__ == "__main__":
    app.run(debug=True)