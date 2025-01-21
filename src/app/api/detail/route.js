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
        Id: Constants.detailAbsentId,
      },
      ruleInputs: [
        {
          Name: "EMPLOYEE",
          Type: 8,
          Value: body.username,
        },
      ],
      sessionId: Constants.sessionId,
    };
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = {
      checkIn: CustonFindByName.search({
        dataArray: response.data["d"],
        search: "O_CHECKIN_TIME",
      }),
      checkOut: CustonFindByName.search({
        dataArray: response.data["d"],
        search: "O_CHECKOUT_TIME",
      }),
      checkInLoc: CustonFindByName.search({
        dataArray: response.data["d"],
        search: "O_CHECKIN_LOCATION",
      }),
      checkOutLoc: CustonFindByName.search({
        dataArray: response.data["d"],
        search: "O_CHECKOUT_LOCATION",
      }),
    };
    // Return success response
    return NextResponse.json(
      { message: "success", data: resData },
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
