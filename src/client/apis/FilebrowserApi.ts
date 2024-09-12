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
import type { Folder, HTTPValidationError } from '../models/index';
import {
    FolderFromJSON,
    FolderToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
} from '../models/index';

export interface GetFolderRequest {
    path: string;
}

/**
 *
 */
export class FilebrowserApi extends runtime.BaseAPI {
    /**
     * fetch a folder
     * File Browser APi
     */
    async getFolderRaw(
        requestParameters: GetFolderRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<runtime.ApiResponse<Folder>> {
        if (requestParameters.path === null || requestParameters.path === undefined) {
            throw new runtime.RequiredError(
                'path',
                'Required parameter requestParameters.path was null or undefined when calling getFolder.'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request(
            {
                path: `/api/browse/{path}`.replace(
                    `{${'path'}}`,
                    encodeURIComponent(String(requestParameters.path))
                ),
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides
        );

        return new runtime.JSONApiResponse(response, (jsonValue) =>
            FolderFromJSON(jsonValue)
        );
    }

    /**
     * fetch a folder
     * File Browser APi
     */
    async getFolder(
        requestParameters: GetFolderRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction
    ): Promise<Folder> {
        const response = await this.getFolderRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
