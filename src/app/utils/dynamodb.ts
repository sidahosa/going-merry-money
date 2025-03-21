import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1", // Change to your AWS region
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

const dynamoDb = DynamoDBDocumentClient.from(client);

export { dynamoDb };
