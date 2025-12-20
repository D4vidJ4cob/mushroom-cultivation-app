# SubstratesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**substrateControllerCreateSubstrate**](#substratecontrollercreatesubstrate) | **POST** /api/substrates | |
|[**substrateControllerDeleteSubstrateById**](#substratecontrollerdeletesubstratebyid) | **DELETE** /api/substrates/{id} | |
|[**substrateControllerGetAllSubstrates**](#substratecontrollergetallsubstrates) | **GET** /api/substrates | |
|[**substrateControllerGetSubstrateById**](#substratecontrollergetsubstratebyid) | **GET** /api/substrates/{id} | |
|[**substrateControllerUpdateSubstrateById**](#substratecontrollerupdatesubstratebyid) | **PUT** /api/substrates/{id} | |

# **substrateControllerCreateSubstrate**
> SubstrateDetailResponseDto substrateControllerCreateSubstrate(createSubstrateRequestDto)


### Example

```typescript
import {
    SubstratesApi,
    Configuration,
    CreateSubstrateRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SubstratesApi(configuration);

let createSubstrateRequestDto: CreateSubstrateRequestDto; //

const { status, data } = await apiInstance.substrateControllerCreateSubstrate(
    createSubstrateRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSubstrateRequestDto** | **CreateSubstrateRequestDto**|  | |


### Return type

**SubstrateDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Create substrates |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **substrateControllerDeleteSubstrateById**
> substrateControllerDeleteSubstrateById()


### Example

```typescript
import {
    SubstratesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubstratesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.substrateControllerDeleteSubstrateById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Delete substrates |  -  |
|**404** | Substrates not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **substrateControllerGetAllSubstrates**
> SubstrateListResponseDto substrateControllerGetAllSubstrates()


### Example

```typescript
import {
    SubstratesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubstratesApi(configuration);

const { status, data } = await apiInstance.substrateControllerGetAllSubstrates();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SubstrateListResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get all substrates |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **substrateControllerGetSubstrateById**
> SubstrateDetailResponseDto substrateControllerGetSubstrateById()


### Example

```typescript
import {
    SubstratesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubstratesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.substrateControllerGetSubstrateById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**SubstrateDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get substrates by ID |  -  |
|**401** | Unauthorized - you need to be signed in |  -  |
|**404** | Substrates not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **substrateControllerUpdateSubstrateById**
> SubstrateDetailResponseDto substrateControllerUpdateSubstrateById(body)


### Example

```typescript
import {
    SubstratesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubstratesApi(configuration);

let id: number; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.substrateControllerUpdateSubstrateById(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**SubstrateDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Update substrates |  -  |
|**400** | Invalid input data |  -  |
|**404** | Substrates not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

