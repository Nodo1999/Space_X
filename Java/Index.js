function clickHandler() {
    const cont=document.getElementsByClassName('burger-menu').item(0)
    const nav=document.getElementsByTagName('nav').item(0);
    cont.classList.toggle('modify')
    nav.classList.toggle('change');
}

const url='https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json';

async function countBoxes (x) {
    let n = x.split(',');
    console.log(n) ; 
    let k =  x.split(',').map(element => {
        return Number(element);
    });
    console.log(k);
    let count = 0; 
    k.forEach(el => {
        count+=el 
    });  
    if ( count%10 == 0) 
    return count/10;
    else return   Math.ceil(count/10);   
}

async function storeData(e) {   
    const name=e;
    await fetch(url)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else throw new Error("user doesn't exist");
    }).then((data)=> {
        data.forEach(element => {
            if (name == element.name) { 
                document.getElementById('test-name').innerText=element.name;
                document.getElementById('test-mail').innerText=element.email;
                document.getElementById('cargo-inp').value=element.boxes;
                const myElement = document.getElementById('cargo-inp');
                countBoxes(element.boxes).then((res)=> document.getElementById('box-num').innerText=res)  ;
                myElement.addEventListener("input" , ()=>   countBoxes(document.getElementById('cargo-inp').value)
                .then((res)=> document.getElementById('box-num').innerText=res));
            }
        });
    })
    .catch((err) => console.error(err));
}