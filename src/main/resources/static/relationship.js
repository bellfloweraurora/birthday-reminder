let pageInfo = {
    "total": 0,
    "list": [],
    "pageNum": 1,
    "pageSize": 10,
    "size": 0,
    "startRow": 0,
    "endRow": 0,
    "pages": 0,
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [],
    "navigateFirstPage": 1,
    "navigateLastPage": 1
}

// 添加分页相关的全局变量
let currentPage = 1;
let totalPages = 1;
let totalRecords = 0;

const relationshipsBody = document.getElementById("relationshipsBody");
const relationshipRowTemplate = document.getElementById("relationship-row-template");

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
        console.log("分页响应数据:", data); // 调试日志
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
    console.log("更新分页UI:", { currentPage, totalPages, totalRecords }); // 调试日志

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

// 渲染亲友数据到界面
function renderRelationships(){
    console.log("渲染数据，当前页数据量:", pageInfo.list.length); // 调试日志

    // 把之前的内容清空
    relationshipsBody.innerHTML = '';

    if (!pageInfo.list || pageInfo.list.length === 0) {
        relationshipsBody.innerHTML = '<tr><td colspan="9" style="text-align: center;">暂无数据</td></tr>';
        return;
    }

    pageInfo.list.forEach(relationship => {
        // 处理数据格式
        const displayData = {
            ...relationship,
            calendarType: relationship.calendarType === 0 ? '公历' : '农历',
            // reminderEnabled: relationship.reminderEnabled ? '是' : '否',
            // congratulateEnabled: relationship.congratulateEnabled ? '是' : '否',
            reminderChecked: relationship.reminderEnabled ? 'checked' : '',
            congratulateChecked: relationship.congratulateEnabled ? 'checked' : '',
            reminderClass: relationship.reminderEnabled ? 'true' : 'false',
            congratulateClass: relationship.congratulateEnabled ? 'true' : 'false',
            // reminderEnabled: relationship.reminderEnabled ? 'switch-on' : 'switch-off',
            // congratulateEnabled: relationship.congratulateEnabled ? 'switch-on' : 'switch-off',

            birthday: relationship.birthday ? relationship.birthday : `${relationship.birthdayMonth}-${relationship.birthdayDay}`
        };

        // 把模板的内容替换到body里边
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

function pageQuery(){
    currentPage = 1; // 重置到第一页
    let name = document.querySelector("#page-query-name")?.value || '';
    let tag = document.querySelector("#page-query-tag")?.value || '';
    let parm = {
        page: 1,
        size: 10,
        name: name,
        tag: tag
    }

    console.log("查询参数:", parm); // 调试日志

    // 发送分页请求
    get("/relationship/page", parm).then(data => {
        console.log("查询响应数据:", data); // 调试日志
        pageInfo = data;
        currentPage = pageInfo.pageNum;
        totalPages = pageInfo.pages;
        totalRecords = pageInfo.total;
        renderRelationships();
        updatePaginationUI();
    }).catch(error => {
        console.error("请求失败:", error);
    });
}

// 页面加载完成后初始化分页信息
document.addEventListener('DOMContentLoaded', function() {
    // 绑定分页按钮事件 - 只保留一种绑定方式
    document.getElementById('firstPageBtn').addEventListener('click', () => goToPage(1));
    document.getElementById('prevPageBtn').addEventListener('click', () => goToPage(currentPage - 1));
    document.getElementById('nextPageBtn').addEventListener('click', () => goToPage(currentPage + 1));
    document.getElementById('lastPageBtn').addEventListener('click', () => goToPage(totalPages));

    //ai补充的监听器
    if (firstPageBtn) {
        firstPageBtn.addEventListener('click', () => goToPage(1));
    }
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => goToPage(currentPage - 1));
    }
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => goToPage(currentPage + 1));
    }
    if (lastPageBtn) {
        lastPageBtn.addEventListener('click', () => goToPage(totalPages));
    }


    // 初始化时加载第一页数据
    pageQuery();
});