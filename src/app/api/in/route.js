import { NextResponse } from "next/server";
import axios from "axios";

// Custom utilities (replace these with your actual implementations)
import Constants from "@/utils/constants"; // Adjust the path to your constants
import CustomGen16Char from "@/utils/customgen16char";
import CustonFindByName from "@/utils/customfindbyname";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body
    const url =
      "https://smart.mcf.co.id/TotalAgility/Services/SDK/BusinessRuleService.svc/json/ExecuteBusinessRule";

    const data = {
      businessRuleRuntimeIdentity: {
        Id: Constants.inId,
      },
      ruleInputs: [
        {
          Name: "ATTDTYPE",
          Type: 2,
          Value: 0,
        },
        {
          Name: "EMPLOYEE",
          Type: 8,
          Value: body.username,
        },
        {
          Name: "LATITUDE",
          Type: 8,
          Value: body.lat,
        },
        {
          Name: "LONGITUDE",
          Type: 8,
          Value: body.lon,
        },
      ],
      sessionId: Constants.sessionId,
    };
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Return success response
    return NextResponse.json(
      { message: "success", data: null },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    // Return error response
    return NextResponse.json(
      { message: error.message || "An error occurred.", data: null },
      { status: 500 }
    );
  }
}
