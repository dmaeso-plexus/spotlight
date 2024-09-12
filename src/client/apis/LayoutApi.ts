/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import type { HTTPValidationError, SetLayoutRequest } from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    SetLayoutRequestFromJSON,
    SetLayoutRequestToJSON,
} from '../models/index';

export interface GetLayoutRequest {
    browserId?: string | null;
}

export interface ResetLayoutRequest {
    browserId?: string | null;
}

export interface SetLayoutOperationRequest {
    setLayoutRequest: SetLayoutRequest;
    browserId?: string | null;
}

/**
 *
 */
export class LayoutApi extends runtime.BaseAPI {
    /**
     * Get layout.
     * Get Layout
     */
    async getLayoutRaw(
        requestParameters: GetLayoutRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<object>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request(
            {
                path: `/api/layout/`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides
        );

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Get layout.
     * Get Layout
     */
    async getLayout(
        requestParameters: GetLayoutRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<object> {
        const response = await this.getLayoutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get layout.
     * Reset Layout
     */
    async resetLayoutRaw(
        requestParameters: ResetLayoutRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<object>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request(
            {
                path: `/api/layout/reset`,
                method: 'PUT',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides
        );

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Get layout.
     * Reset Layout
     */
    async resetLayout(
        requestParameters: ResetLayoutRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<object> {
        const response = await this.resetLayoutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get layout.
     * Set Layout
     */
    async setLayoutRaw(
        requestParameters: SetLayoutOperationRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<object>> {
        if (
            requestParameters.setLayoutRequest === null ||
            requestParameters.setLayoutRequest === undefined
        ) {
            throw new runtime.RequiredError(
                'setLayoutRequest',
                'Required parameter requestParameters.setLayoutRequest was null or undefined when calling setLayout.'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request(
            {
                path: `/api/layout/`,
                method: 'PUT',
                headers: headerParameters,
                query: queryParameters,
                body: SetLayoutRequestToJSON(requestParameters.setLayoutRequest),
            },
            initOverrides
        );

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Get layout.
     * Set Layout
     */
    async setLayout(
        requestParameters: SetLayoutOperationRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<object> {
        const response = await this.setLayoutRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
