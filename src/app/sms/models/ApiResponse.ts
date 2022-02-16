export class ApiResponse {
    code: string;
    message: Number;
    data: any;
    errors: string[];

    static isSuccess(apiResponse: ApiResponse) {
        return apiResponse && apiResponse.code === ApiResponseCodes.Ok
    }

}

export enum ApiResponseCodes {
    Ok = '000',

}