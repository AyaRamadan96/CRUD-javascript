
var siteNameInp = document.getElementById("siteNameInp");
var SiteUrlInp = document.getElementById("SiteUrlInp");
var nameError = `<p class="error">Name is required</p>`;
var urlError = `<p class="error">Url Field is required</p>`; 
var bookmarkList;

/*function nameError()
{
    document.getElementById("nameError").innerHTML = `<p class="error">Name is required</p>`;
}

function urlError()
{
    document.getElementById("urlError").innerHTML = `<p class="error">Url Field is required</p>`;
}*/

if(localStorage.getItem("sitNames") == null)
{
    bookmarkList = [];
}
else
{
    bookmarkList = JSON.parse(localStorage.getItem("sitNames"));
    displayBookmark();
}


function addBookmark()
{
    if ( siteNameInp.value=="" || siteNameInp.value == null )
    {
        document.getElementById("nameError").innerHTML = nameError;
        document.getElementById("urlError").innerHTML = "";
    }
    else if( SiteUrlInp.value=="" || SiteUrlInp.value == null )
    {
        document.getElementById("nameError").innerHTML = "";
        document.getElementById("urlError").innerHTML = urlError;
    }
    else if( siteNameInp.value=="" || siteNameInp.value == null && SiteUrlInp.value=="" || SiteUrlInp.value == null )
    {
        document.getElementById("nameError").innerHTML = nameError;
        document.getElementById("urlError").innerHTML = urlError;
    }
    else
    {
        document.getElementById("nameError").innerHTML = "";
        document.getElementById("urlError").innerHTML = "";

        var obj = 
        {
            name : siteNameInp.value,
            url : SiteUrlInp.value,
        }
        bookmarkList.push(obj);
        localStorage.setItem("sitNames" , JSON.stringify(bookmarkList));
        displayBookmark();
        clrForm();
    }
}
function displayBookmark()
{
    var cartoona =``;
    for(var i = 0 ; i < bookmarkList.length ; i++)
    {
        cartoona += `<div class="cartoona row">
        <h2>`+bookmarkList[i].name+`</h2>
        <a href="https://`+bookmarkList[i].url+`" target="_blank" class="btn btn-primary">visit</a>
        <button class="btn btn-warning ml-2" onclick="updateKey(`+i+`)">Update</button>
        <button class="btn btn-danger ml-2" onclick="deleteKey(`+i+`)">Delete</button>
        </div>`
    }
    document.getElementById("bookmarkBody").innerHTML = cartoona;
}
function deleteKey(index)
{

    bookmarkList.splice(index , 1);
    localStorage.setItem("sitNames" , JSON.stringify(bookmarkList));
    displayBookmark();
}

function clrForm()
{
    siteNameInp.value = "";
    SiteUrlInp.value = "";
}

function updateKey(index)
{
    siteNameInp.value = bookmarkList[index].name;
    SiteUrlInp.value = bookmarkList[index].url;
    document.getElementById("addUpdate").innerHTML = `<button type="submit" class="btn btn-success" onclick="addUpdate(`+index+`)">addUpdate</button>`
    var cartoona =``;
    for(var i = 0 ; i < bookmarkList.length ; i++)
    {
        cartoona += `<div class="cartoona row">
        <h2>`+bookmarkList[i].name+`</h2>
        <a href="https://`+bookmarkList[i].url+`" target="_blank" class="btn btn-primary">visit</a>
        <button class="btn btn-warning ml-2">Update</button>
        <button class="btn btn-danger ml-2">Delete</button>
        </div>`
    }
    document.getElementById("bookmarkBody").innerHTML = cartoona;
}

function addUpdate(index)
{
    bookmarkList[index].name = siteNameInp.value;
    bookmarkList[index].url = SiteUrlInp.value;
    localStorage.setItem("sitNames" , JSON.stringify(bookmarkList));
    document.getElementById("addUpdate").innerHTML = "";
    displayBookmark();
}