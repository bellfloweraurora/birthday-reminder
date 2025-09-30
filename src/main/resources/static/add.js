// add.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('relationshipForm');

    // // 验证：当勾选reminderEnabled时，daysBefore为必填项 ai
    // const reminderCheckbox = document.getElementById('reminderEnabled');
    // const daysBeforeInput = document.getElementById('daysBefore');
    // // 添加实时验证：监听 reminderEnabled 和 daysBefore 的变化
    // function validateDaysBefore() {
    //     if (reminderCheckbox.checked) {
    //         if (!daysBeforeInput.value.trim()) {
    //             daysBeforeInput.setCustomValidity("启用提醒时必须填写提前通知天数");
    //         } else {
    //             daysBeforeInput.setCustomValidity("");
    //         }
    //     } else {
    //         daysBeforeInput.setCustomValidity("");
    //     }
    // }
    // // 监听 reminderEnabled 的变化
    // reminderCheckbox.addEventListener('change', validateDaysBefore);
    // // 监听 daysBefore 输入的变化
    // daysBeforeInput.addEventListener('input', validateDaysBefore);
    // // 验证：当勾选reminderEnabled时，daysBefore为必填项 ai


    // 表单提交处理
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 收集表单数据
        const formData = new FormData(form);
        const relationship = {};

        // 基本字段处理
        relationship.name = formData.get('name');
        relationship.calendarType = parseInt(formData.get('calendarType'));
        relationship.birthday = formData.get('birthday');
        relationship.tag = formData.get('tag') || null;
        relationship.reminderEnabled = formData.get('reminderEnabled') === 'on';
        relationship.congratulateEnabled = formData.get('congratulateEnabled') === 'on';
        relationship.relationshipEmail = formData.get('relationshipEmail') || null;
        relationship.greeting = formData.get('greeting') || null;
        relationship.selfCall = formData.get('selfCall') || null;
        relationship.notes = formData.get('notes') || null;

        // 处理提前通知天数
        const daysBefore = formData.get('daysBefore');
        if (daysBefore) {
            relationship.daysBefore = daysBefore.split(',')
                .map(day => parseInt(day.trim()))
                .filter(day => !isNaN(day));
        } else {
            relationship.daysBefore = [];
        }


        // // 验证：当勾选reminderEnabled时，daysBefore为必填项 ai
        // // 获取daysBefore输入框元素
        // const daysBeforeInput = document.getElementById('daysBefore');
        //
        // // 验证：当勾选reminderEnabled时，daysBefore为必填项
        // if (relationship.reminderEnabled && (!daysBefore || relationship.daysBefore.length === 0)) {
        //     daysBeforeInput.setCustomValidity("启用提醒时必须填写提前通知天数");
        //     daysBeforeInput.reportValidity();
        //     return;
        // } else {
        //     // 清除自定义验证消息
        //     daysBeforeInput.setCustomValidity("");
        // }
        // // 验证：当勾选reminderEnabled时，daysBefore为必填项 ai
        // if (relationship.reminderEnabled && (!daysBefore || relationship.daysBefore.length === 0)) {
        //     daysBeforeInput.setCustomValidity("启用提醒时必须填写提前通知天数");
        //     daysBeforeInput.reportValidity();
        //     return;
        // } else {
        //     // 清除自定义验证消息
        //     daysBeforeInput.setCustomValidity("");
        // }
        // // 验证：当勾选reminderEnabled时，daysBefore为必填项 ai

        // // 处理生日月份和天数
        // relationship.birthdayMonth = parseInt(formData.get('birthdayMonth'));
        // relationship.birthdayDay = parseInt(formData.get('birthdayDay'));

        // 调用API保存数据
        post('/relationship/add', relationship)
            .then(response => {
                if(response===true){
                    alert('保存成功！');
                    //ai
                    form.reset();
                    // //重置验证状态, 验证：当勾选reminderEnabled时，daysBefore为必填项 ai
                    // daysBeforeInput.setCustomValidity("");
                    // 保存成功后跳转回列表页面
                    window.location.href = './index.html';
                }
            })
            .catch(error => {
                //ai
                console.error('保存失败:', error);
                alert('保存失败: ' + error.message);
            });
    });
});
