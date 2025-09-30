// 前后端放在一起可不写'http://localhost:8080'
const API_BASE_URL = 'http://localhost:8080'; // 根据实际情况修改基础 URL

/**
 * 处理 HTTP 响应
 * @param {Response} response - fetch 返回的响应对象
 * @returns {Promise<any>} 解析后的 JSON 数据
 */
// function handleResponse(response) {
//     if (!response.ok) {
//         throw new Error(`HTTP 错误！状态码: ${response.status}`);
//     }
//     return response.json();
// }
function handleResponse(response ) {
    if (!response.ok) {
        throw new Error(`HTTP 错误！状态码：${response.status}`);
    }

    return response.json().then(data => {
        const {success, message, code, data: responseData} = data;
        if (success) {
            return responseData;// 只返回 data 分给调用者
        }

        throw new Error(`后端错误：${message} (Code: ${code})`);

    });
}
// function handleResponse(response) {
//     if (!response.ok) {
//         throw new Error(`HTTP 错误！状态码：${response.status}`);
//     }
//
//     return response.json().then(data => {
//         // 检查数据结构是否存在 success 字段
//         if (data && typeof data === 'object' && 'success' in data) {
//             const { success, message, code, data: responseData } = data;
//             if (success) {
//                 return responseData;
//             }
//             throw new Error(`后端错误：${message} (Code: ${code})`);
//         }
//         // 如果没有 success 字段，直接返回整个数据
//         return data;
//     }).catch(error => {
//         throw new Error(`解析响应数据失败: ${error.message}`);
//     });
// }


/**
 * 发送 GET 请求
 * @param {string} endpoint - 请求的端点路径
 * @param {Object} params - 查询参数
 * @returns {Promise<any>} 请求结果
 */
function get(endpoint, params) {
    // 构建查询字符串
    const queryString = params
        ? Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&')
        : '';
    // 拼接完整的 URL
    const url = queryString
        ? `${API_BASE_URL}${endpoint}?${queryString}`
        : `${API_BASE_URL}${endpoint}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(handleResponse);
}

/**
 * 发送 POST 请求
 * @param {string} endpoint - 请求的端点路径
 * @param {Object} body - 请求体数据
 * @returns {Promise<any>} 请求结果
 */
function post(endpoint, body) {
    return fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(handleResponse);
}

/**
 * 发送 PUT 请求
 * @param {string} endpoint - 请求的端点路径
 * @param {Object} body - 请求体数据
 * @returns {Promise<any>} 请求结果
 */
function put(endpoint, body) {
    return fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(handleResponse);
}

/**
 * 发送 DELETE 请求
 * @param {string} endpoint - 请求的端点路径
 * @returns {Promise<any>} 请求结果
 */
function del(endpoint) {
    return fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(handleResponse);
}




// //前后端放在一起可不写'http://localhost:8080'
// const API_BASE_URL = ''; // 根据实际情况修改基础 URL
//
// /**
//  * 处理 HTTP 响应
//  * @param {Response} response - fetch 返回的响应对象
//  * @returns {Promise<any>} 解析后的 JSON 数据
//  */
// function handleResponse(response) {
//     if (!response.ok) {
//         throw new Error(`HTTP 错误！状态码: ${response.status}`);
//     }
//     return response.json(); // 或者使用 response.text() 如果返回不是 JSON
// }
//
// /**
//  * 发送 GET 请求
//  * @param {string} endpoint - 请求的端点路径
//  * @returns {Promise<any>} 请求结果
//  */
// function get(string , Object ) {
//     // 构建查询字符串
//     const queryString = params
//         ? Object.entries(params) [(string, unknown)]
//             .map(([key, value ] ) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
//             .join('&')
//         : '';
//     // 拼接完整的 URL
//     const url = queryString
//         ? `${API_BASE_URL}${endpoint}?${queryString}`
//         : `${API_BASE_URL}${endpoint}`;
//     return fetch(url, {
//         method: 'GET',
//             headers: {
//             'Content-Type': 'application/json',
//         },
//     }).then(handleResponse);
// }
//
//
//     /**
//      * 发送 POST 请求
//      * @param {string} endpoint - 请求的端点路径
//      * @param {Object} body - 请求体数据
//      * @returns {Promise<any>} 请求结果
//      */
//     1+ usages
//     function post(string ,Object ){
//         return fetch(`${API_BASE_URL}${endpoint}`,{
//             method: 'POST',
//                 headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(body),
//         }).then(handleResponse);
//     }
//
// /**
//  * 发送 PUT 请求
//  * @param {string} endpoint - 请求的端点路径
//  * @param {Object} body - 请求体数据
//  * @returns {Promise<any>} 请求结果
//  */
//
// function put(string , Object )  {
//     return fetch(  '${API_BASE_URL}${endpoint}', {
//         method: 'PUT',
//             headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     }).then(handleResponse)
// }
//
// /**
//  * 发送 DELETE 请求
//  * @param {string} endpoint - 请求的端点路径
//  * @returns {Promise<any>} 请求结果
//  */
// 1+ usages
// function del(string){
//     return fetch( '${API_BASE_URL}${endpoint}', {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }).then(handleResponse);
// }
