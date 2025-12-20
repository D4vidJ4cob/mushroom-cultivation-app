# LiquidCulturesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**liquidCultureControllerCreateLiquidCulture**](#liquidculturecontrollercreateliquidculture) | **POST** /api/liquid-cultures | |
|[**liquidCultureControllerDeleteLiquidCulture**](#liquidculturecontrollerdeleteliquidculture) | **DELETE** /api/liquid-cultures/{id} | |
|[**liquidCultureControllerGetAllLiquidCultures**](#liquidculturecontrollergetallliquidcultures) | **GET** /api/liquid-cultures | |
|[**liquidCultureControllerGetLiquidCultureById**](#liquidculturecontrollergetliquidculturebyid) | **GET** /api/liquid-cultures/{id} | |
|[**liquidCultureControllerUpdateLiquidCultureById**](#liquidculturecontrollerupdateliquidculturebyid) | **PUT** /api/liquid-cultures/{id} | |

# **liquidCultureControllerCreateLiquidCulture**
> LiquidCultureDetailResponseDto liquidCultureControllerCreateLiquidCulture(createLiquidCultureRequestDto)


### Example

```typescript
import {
    LiquidCulturesApi,
    Configuration,
    CreateLiquidCultureRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new LiquidCulturesApi(configuration);

let createLiquidCultureRequestDto: CreateLiquidCultureRequestDto; //

const { status, data } = await apiInstance.liquidCultureControllerCreateLiquidCulture(
    createLiquidCultureRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createLiquidCultureRequestDto** | **CreateLiquidCultureRequestDto**|  | |


### Return type

**LiquidCultureDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Create culture |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liquidCultureControllerDeleteLiquidCulture**
> liquidCultureControllerDeleteLiquidCulture()


### Example

```typescript
import {
    LiquidCulturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiquidCulturesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.liquidCultureControllerDeleteLiquidCulture(
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
|**204** | Delete culture |  -  |
|**404** | Culture not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liquidCultureControllerGetAllLiquidCultures**
> LiquidCultureListResponseDto liquidCultureControllerGetAllLiquidCultures()


### Example

```typescript
import {
    LiquidCulturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiquidCulturesApi(configuration);

const { status, data } = await apiInstance.liquidCultureControllerGetAllLiquidCultures();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**LiquidCultureListResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get all cultures |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liquidCultureControllerGetLiquidCultureById**
> LiquidCultureDetailResponseDto liquidCultureControllerGetLiquidCultureById()


### Example

```typescript
import {
    LiquidCulturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiquidCulturesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.liquidCultureControllerGetLiquidCultureById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**LiquidCultureDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get culture by ID |  -  |
|**401** | Unauthorized - you need to be signed in |  -  |
|**404** | Culture not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **liquidCultureControllerUpdateLiquidCultureById**
> LiquidCultureDetailResponseDto liquidCultureControllerUpdateLiquidCultureById(body)


### Example

```typescript
import {
    LiquidCulturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LiquidCulturesApi(configuration);

let id: number; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.liquidCultureControllerUpdateLiquidCultureById(
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

**LiquidCultureDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Update culture |  -  |
|**400** | Invalid input data |  -  |
|**404** | Culture not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

