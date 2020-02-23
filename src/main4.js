let inpCode = Number(document.getElementById('inp-code').value);

document.getElementById('inp-text').oninput = function() {
    let str = this.value;
    let out = '';
    for(let i = 0; i < str.length; i++){
        // из символа в код
        let code = str.charCodeAt(i);
        code = code + inpCode;
        //из кода в символ
        out += String.fromCharCode(code);
    }
    document.getElementById('out-text').innerHTML = out;

};

document.getElementById('inp-text-decoder').oninput = function(){
    let str = this.value;
    let out = '';
    for(let i = 0; i < str.length; i++){
        // из символа в код
        let code = str.charCodeAt(i);
        code = code - inpCode;
        //из кода в символ
        out += String.fromCharCode(code);
    }
    document.getElementById('out-text-decoder').innerHTML = out;
}