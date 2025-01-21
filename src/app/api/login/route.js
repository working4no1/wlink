import { NextResponse } from "next/server";
import axios from "axios";

// Custom utilities (replace these with your actual implementations)
import Constants from "@/utils/constants"; // Adjust the path to your constants
import CustomGen16Char from "@/utils/customgen16char";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body

    const url =
      "https://smart.mcf.co.id/TotalAgility/Services/SDK/BusinessRuleService.svc/json/ExecuteBusinessRule";

    const data = {
      businessRuleRuntimeIdentity: {
        Id: Constants.loginId,
      },
      ruleInputs: [
        {
          Name: "USERNAME",
          Type: 8,
          Value: `MACF\\${body.username}`,
        },
        {
          Name: "PASSWORD",
          Type: 8,
          Value: body.password,
        },
        {
          Name: "DEVICEID",
          Type: 32762,
          Value: CustomGen16Char.generate16CharacterString(),
        },
      ],
      sessionId: Constants.sessionId,
    };

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check for a specific condition indicating login failure
    if (response.data?.d?.[0]?.Value === false) {
      return NextResponse.json(
        { message: "Gagal login.", data: null },
        { status: 401 } // Unauthorized
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "success", data: null },
      { status: 200 }
    );
  } catch (error) {
    // Return error response
    return NextResponse.json(
      { message: error.message || "An error occurred.", data: null },
      { status: 500 }
    );
  }
}
