
# TTX GPT
This is a generative AI project that aims to use openAI's API to turn into a traditional Table-top Exercise into something digital. For this project , we will be looking at using a Playbook to "build" a table-top exercise (TTX) for users to have self-directed practices for their TTX.

## Installing dependencies
run: `npm install` to install any javascript dependencies

To install python dependencies: 
`cd backend`

`pip install -r requirements.txt` 

## Add your openAI API key
go to `service.py` and add in your api key at line 43
`openai.api_key = <insert-your-API-key>`

## Using the application:
There are no explicit loading screens or animations. Since this uses openAI API, thus it will take some time for the output to be generated. Please ensure that the output is produced and data is stored before you proceed. 

For any troubleshooting, go to `F12` inspect element and the `console` tab to find the console output. If all is correct the output will be logged.


## To Start Frontend
Run `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## To start Backend
run:
`cd backend`

`py service.py`





