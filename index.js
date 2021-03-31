const util = require('util');
const fs = require('fs');
const TrainingApi = require("@azure/cognitiveservices-customvision-training");
const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");

const sampleDataRoot = "f:/bees/";

const predictionKey = "5e2245d8f8344fb581449b9d7c24b389";
const endPoint = "https://bees.cognitiveservices.azure.com/"
const publishIterationName = "bees"
const projectid = 0 

const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": predictionKey } });
const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, endPoint);


const testFile = fs.readFileSync('f:/bees/Test/040_314.png');

(async () => {
const results = await predictor.classifyImage("56e92ed0-e242-42bf-85c1-9a382e83b61e",
 publishIterationName, testFile);

// Show results
console.log("Results:");
results.predictions.forEach(predictedResult => {
    console.log(`\t ${predictedResult.tagName}: ${(predictedResult.probability * 100.0).toFixed(2)}%`);
});
})()