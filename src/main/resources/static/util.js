//通过占位符进行数值的替换
function replacePlaceholder(template, data){
    //通过模板来获取内容
    let result = template.innerHTML;
    
    //遍历我们的数据，把它替换到内容里面
    for(const key in data){
        //把模板里面的${变量名}替换到数据里面的值
        const value = data[key];
        const placeholder = `\${${key}}`;
        result = result.replace(placeholder, value);
    }
    return result;
}