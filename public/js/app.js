console.log('Helloooo')

let form = document.getElementById('myForm')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    addressFunction()
    console.log(document.getElementById('address').value)
    form.reset()
})


let addressFunction = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            document.getElementById('error').innerText = data.error ;
            document.getElementById('forecast').innerText = '';
            document.getElementById('location').innerText = '';
            document.getElementById("error").className = "alert alert-danger";
            document.getElementById("forecast").className = "";
            document.getElementById("location").className = "";
        }
        else{
            document.getElementById('forecast').innerText =data.forecast
            document.getElementById('location').innerText = data.location 
            document.getElementById('error').innerText = ''
            document.getElementById("forecast").className = "alert alert-success";
            document.getElementById("location").className = "alert alert-info";
            document.getElementById("error").className = "";

        }
    }
    catch(e){
        console.log(e)
    }
}