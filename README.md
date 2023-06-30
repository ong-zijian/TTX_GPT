
# TTX_GPT
This is a generative AI project that aims to use openAI's API to turn into a traditional Table-top Exercise into something digital. For this project , we will be looking at using a Playbook as a reference for a table-top exercise (TTX), allowing users to have self-directed practices for their TTX.

## Installing dependencies
1. Go to a command prompt terminal.
2. run: `npm install` to install any javascript dependencies
3. To install python dependencies, run the following command line by line:<br>`cd backend`<br>`pip install -r requirements.txt` 

## Add your openAI API key
go to `service.py` and add in your API key at line 43 `openai.api_key = <insert-your-API-key>`

## To Start Frontend
1. Ensure the you are in the project root.
2. Run `npm start` to start the React App
3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## To start Backend
1. Open another command prompt terminal
2. run both on seperate lines:<br>`cd backend`<br>`py service.py`

## Using the application:
There are no explicit loading screens or animations. Since this uses openAI API, thus it will take some time for the output to be generated. Please ensure that the output is produced and data is stored before you proceed.

Video Demonstration: https://youtu.be/w8b-TZwpAUU

1. Upload a playbook (You may use `ransomware2.pdf` inside the .zip as it's size is not too big that it exceeds the GPT token. credits: https://www.pensar.co.uk/hubfs/Ransomware%20disaster%20response%20plan%20template-1.pdf)
2. Scroll down to read the Scenario, Context and Question.
3. Answer the question and click `evaluate`
4. Wait for the evaluation to appear below
5. Click on `Next Question`
6. Answer all 4 questions
7. Click on `Get Final Evaluation`
8. Wait for the Final Evaluation to show up

To check whether the output is stored, go to `F12` inspect element and the `console` tab to find the console output. If all is correct the output will be logged.





