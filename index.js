//  get the required packages
const util = require('util');
const fs = require('fs');
const TrainingApi = require("@azure/cognitiveservices-customvision-training");
const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");

const sampleDataRoot = "<your folder>";

//  Configure your authentication details
const predictionKey = "<key of the prediction resource>";
const endPoint = "https://bees.cognitiveservices.azure.com/"
const publishIterationName = "bees"
const projectid = "<project id >" 

//  Authenticate with Azure Cognitive Services
const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": predictionKey } });
const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, endPoint);

//  Predict the disease of the unseen data, if not any disease , it should return healthy
const testFile = fs.readFileSync('<your file name -  bees01.png>');

(async () => {
const results = await predictor.classifyImage("projectid",
 publishIterationName, testFile);

// Show results
console.log("Results:");
results.predictions.forEach(predictedResult => {
    console.log(`\t ${predictedResult.tagName}: ${(predictedResult.probability * 100.0).toFixed(2)}%`);
});
})()
