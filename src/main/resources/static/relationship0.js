// //亲友数据
// const relationships = [
//     {
//         id: 1,
//         name: "张一",
//         calendarType:"公历",
//         birthday:"01-01",
//         tag:"朋友",
//         reminderEnabled:true,
//         congratulateEnabled:true
//     }
// ]
let pageInfo = {
    "total": 6,
    "list":[],
    "pageNum": 1,
    "pageSize": 6,
    "size": 6,
    "startRow": 0,
    "endRow": 5,
    "pages": 1,
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
        1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1
}

// //以下分页部分由ai生成

// 添加分页相关的全局变量
let currentPage = 1;
let totalPages = 1;
let totalRecords = 0;

// 分页导航函数
function goToPage(page) {
    // 确保页码在有效范围内
    if (page < 1 || page > totalPages) {
        return;
    }

    currentPage = page;

    // 获取搜索条件
    let name = document.querySelector("#page-query-name")?.value || '';
    let tag = document.querySelector("#page-query-tag")?.value || '';

    let parm = {
        page: currentPage,
        size: 10,
        name: name,
        tag: tag
    };

    // 发送分页请求
    get("/relationship/page", parm).then(data => {
        pageInfo = data;
        currentPage = pageInfo.pageNum;
        totalPages = pageInfo.pages;
        totalRecords = pageInfo.total;
        renderRelationships();
        updatePaginationUI();
    }).catch(error => {
        console.error("分页请求失败", error);
    });
}

// 更新分页UI
function updatePaginationUI() {
    // 更新分页信息显示
    document.getElementById('totalRecords').textContent = totalRecords;
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;

    // 更新按钮状态
    document.getElementById('firstPageBtn').disabled = currentPage === 1;
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage === totalPages;
    document.getElementById('lastPageBtn').disabled = currentPage === totalPages;
}
// //以上分页部分由ai生成


const relationshipsBody = document.getElementById("relationshipsBody");
console.log(relationshipsBody);
const relationshipRowTemplate = document.getElementById("relationship-row-template");



// 渲染亲友数据到界面
//ai下
function renderRelationships(){
    //把之前的内容清空
    relationshipsBody.innerHTML = '';

    pageInfo.list.forEach(relationship => {
        // 处理数据格式
        const displayData = {
            ...relationship,
            calendarType: relationship.calendarType === 0 ? '公历' : '农历',
            reminderEnabled: relationship.reminderEnabled ? '是' : '否',
            congratulateEnabled: relationship.congratulateEnabled ? '是' : '否',
            birthday: relationship.birthday ? relationship.birthday : `${relationship.birthdayMonth}-${relationship.birthdayDay}`
        };

        //把模板的内容替换到body里边
        let clone = relationshipRowTemplate.content.cloneNode(true);
        var tr = clone.querySelector("tr");
        tr.innerHTML = replacePlaceholder(relationshipRowTemplate, displayData);
        relationshipsBody.appendChild(tr);
    });

    // 重新绑定删除按钮事件
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if(confirm('确定要删除这位亲友吗？')) {
                this.closest('tr').remove();
            }
        });
    });
}
//ai上


// 目前控制台报错，但能使用搜索：6（索引）:319 Uncaught TypeError: Cannot read properties of null (reading 'value')
// at HTMLButtonElement.<anonymous> (（索引）:319:53)
function pageQuery(){
    currentPage = 1; // 重置到第一页
    let name= document.querySelector("#page-query-name").value;
    let tag= document.querySelector("#page-query-tag").value;
    let parm = {
        page: 1,
        size: 10,
        name:name,
        tag:tag
    }
    // 注意这里应该是异步调用
    get("/relationship/page", parm).then(data => {
        pageInfo=data;
        //ai下
        currentPage = pageInfo.pageNum;
        totalPages = pageInfo.pages;
        totalRecords = pageInfo.total;
        //ai上
        renderRelationships();
        //ai下
        updatePaginationUI();
        //ai上
    }).catch(error => {
        console.error("请求失败:", error);
    });

}






// /**
//  * 处理 HTTP 响应
//  * @param {Response} response - fetch 返回的响应对象
//  * @returns {Promise<any>} 解析后的 JSON 数据
//  */
// function pageQuery(response) {
//     if (!response.ok) {
//         throw new Error(`HTTP 错误！状态码：${response.status}`);
//     }
//
//     return response.json().then(data => {
//         // 根据 ResponseEntity 结构处理响应数据
//         if (data && typeof data === 'object' && 'success' in data) {
//             const { success, message, code, data: responseData } = data;
//             if (success) {
//                 return responseData; // 返回实际数据部分
//             }
//             // 处理失败情况
//             throw new Error(`后端错误：${message} (Code: ${code})`);
//         }
//         // 如果不是 ResponseEntity 格式，直接返回数据
//         return data;
//     }).catch(error => {
//         // 处理解析错误
//         throw new Error(`解析响应数据失败: ${error.message}`);
//     });
// }

//询问通义后添加，为了使用page-query-name按钮
// 在 relationship.js 文件末尾添加
document.addEventListener('DOMContentLoaded', function() {
    // 确保页面加载完成后执行
    //ai下
    // 绑定分页按钮事件
    document.getElementById('firstPageBtn').addEventListener('click', () => goToPage(1));
    document.getElementById('prevPageBtn').addEventListener('click', () => goToPage(currentPage - 1));
    document.getElementById('nextPageBtn').addEventListener('click', () => goToPage(currentPage + 1));
    document.getElementById('lastPageBtn').addEventListener('click', () => goToPage(totalPages));
    // 初始化时加载第一页数据
    pageQuery();
    //ai上
});
