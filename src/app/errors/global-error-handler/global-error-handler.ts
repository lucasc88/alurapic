import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandler implements ErrorHandler {

    handleError(error: any): void {
        console.log('passed through the error handler')
        throw error;
    }
}