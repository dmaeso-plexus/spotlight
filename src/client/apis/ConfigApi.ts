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
import type {
    HTTPValidationError,
    ResponseGetValue,
    SetConfigRequest,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    ResponseGetValueFromJSON,
    ResponseGetValueToJSON,
    SetConfigRequestFromJSON,
    SetConfigRequestToJSON,
} from '../models/index';

export interface GetValueRequest {
    name: string;
    browserId?: string | null;
}

export interface RemoveRequest {
    name: string;
    browserId?: string | null;
}

export interface SetValueRequest {
    name: string;
    setConfigRequest: SetConfigRequest;
    browserId?: string | null;
}

/**
 *
 */
export class ConfigApi extends runtime.BaseAPI {
    /**
     * get config value by name
     * Get Value
     */
    async getValueRaw(
        requestParameters: GetValueRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<ResponseGetValue>> {
        if (requestParameters.name === null || requestParameters.name === undefined) {
            throw new runtime.RequiredError(
                'name',
                'Required parameter requestParameters.name was null or undefined when calling getValue.'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request(
            {
                path: `/api/config/{name}`.replace(
                    `{${'name'}}`,
                    encodeURIComponent(String(requestParameters.name))
                ),
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides
        );

        return new runtime.JSONApiResponse(response, (jsonValue) =>
            ResponseGetValueFromJSON(jsonValue)
        );
    }

    /**
     * get config value by name
     * Get Value
     */
    async getValue(
        requestParameters: GetValueRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<ResponseGetValue> {
        const response = await this.getValueRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Remove config value by name.
     * Remove Value
     */
    async removeRaw(
        requestParameters: RemoveRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<any>> {
        if (requestParameters.name === null || requestParameters.name === undefined) {
            throw new runtime.RequiredError(
                'name',
                'Required parameter requestParameters.name was null or undefined when calling remove.'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request(
            {
                path: `/api/config/{name}`.replace(
                    `{${'name'}}`,
                    encodeURIComponent(String(requestParameters.name))
                ),
                method: 'DELETE',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides
        );

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Remove config value by name.
     * Remove Value
     */
    async remove(
        requestParameters: RemoveRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<any> {
        const response = await this.removeRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Set config value by name.
     * Set Value
     */
    async setValueRaw(
        requestParameters: SetValueRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<any>> {
        if (requestParameters.name === null || requestParameters.name === undefined) {
            throw new runtime.RequiredError(
                'name',
                'Required parameter requestParameters.name was null or undefined when calling setValue.'
            );
        }

        if (
            requestParameters.setConfigRequest === null ||
            requestParameters.setConfigRequest === undefined
        ) {
            throw new runtime.RequiredError(
                'setConfigRequest',
                'Required parameter requestParameters.setConfigRequest was null or undefined when calling setValue.'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request(
            {
                path: `/api/config/{name}`.replace(
                    `{${'name'}}`,
                    encodeURIComponent(String(requestParameters.name))
                ),
                method: 'PUT',
                headers: headerParameters,
                query: queryParameters,
                body: SetConfigRequestToJSON(requestParameters.setConfigRequest),
            },
            initOverrides
        );

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Set config value by name.
     * Set Value
     */
    async setValue(
        requestParameters: SetValueRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<any> {
        const response = await this.setValueRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
