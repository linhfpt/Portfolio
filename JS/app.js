var txtKeyword = document.forms["search-form"]["keyword"];
var btnSearch = document.forms["search-form"]["search"];
btnSearch.onclick = function () {
    var keyword = txtKeyword.value;
    var divResult = document.getElementById("result");
    // tạo ra đối tượng của XMLHttpRequest.
    // tạo ra biến tên là xhr và có kiểu là XMLHttpRequest.
    var xhr = new XMLHttpRequest(); // XHR
    xhr.onreadystatechange = function () {
        // console.log(this.readyState);
        // request đã hoàn tất
        if (this.readyState === 4) {
            console.log("Request hoàn tất");
            // request thành công
            if (this.status === 200) {
                var jsObject = JSON.parse(this.responseText);
                console.log(jsObject.items);
                var listYoutubeVideo = jsObject.items;
                var htmlResult = "";
                for (var i = 0; i < listYoutubeVideo.length; i++) {
                    htmlResult += `<div class="youtube-item">
                        <div class="thumbnail">
<!--                            <iframe src="https://www.youtube.com/embed/${listYoutubeVideo[i].id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
                            <img src="${listYoutubeVideo[i].snippet.thumbnails.high.url}" alt="">
                        </div>
                         <div class="title">${listYoutubeVideo[i].snippet.title}</div>
                        <div class="description">
                            ${listYoutubeVideo[i].snippet.description}
                        </div>
                        
                    </div>`;
                }
                divResult.innerHTML = htmlResult;
            } else {
                // thất bại.
                console.log("Có lỗi xảy ra.");
            }
        }
        // console.log(this.status);
    }
    // mở một kết nối đến địa chỉ cho sẵn, với phương thức gửi dữ liệu là GET.
    xhr.open("GET", `https://content.googleapis.com/youtube/v3/search?q=${keyword}&type=video&maxResults=9&part=snippet&key=AIzaSyAiVq8q1v8_Dw2O2jKrzQo9CXTOkoT8Cgk`)
    // dữ liệu thực sự được gửi đi.
    xhr.send();
}
document.addEventListener('DOMContentLoaded', () => {
    var divResult = document.getElementById("result");
    var loadApi = new XMLHttpRequest(); // XHR
    loadApi.onreadystatechange = function () {
        // console.log(this.readyState);
        // request đã hoàn tất
        if (this.readyState === 4) {
            console.log("Request hoàn tất");
            // request thành công
            if (this.status === 200) {
                var jsObject = JSON.parse(this.responseText);
                console.log(jsObject.items);
                var listYoutubeVideo = jsObject.items;
                var htmlResult = "";
                for (var i = 0; i < listYoutubeVideo.length; i++) {
                    htmlResult += `<div id="items" class="youtube-item">
                        <div class="thumbnail">
                            <img type="button" id="myImg" src="${listYoutubeVideo[i].snippet.thumbnails.high.url}" alt="">
                        </div>
                        <div class="title ellipsis">${listYoutubeVideo[i].snippet.title}</div>
                        <div class="description ellipsis">
                            ${listYoutubeVideo[i].snippet.description}
                        </div>
                        <!-- Modal video -->
                        <div class="modal">
                        <span class="close">&times;</span>
                        <div class="modal-content">
                        <iframe src="https://www.youtube.com/embed/${listYoutubeVideo[i].id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>  
                        <div id="caption">${listYoutubeVideo[i].snippet.title}</div>
                            </div>
                    </div>`;
                }
                divResult.innerHTML = htmlResult;
            } else {
                // thất bại.
                console.log("Có lỗi xảy ra.");
            }
        }
        // console.log(this.status);

    }
    // mở một kết nối đến địa chỉ cho sẵn, với phương thức gửi dữ liệu là GET.
    loadApi.open("GET", `https://content.googleapis.com/youtube/v3/search?q=" "&type=video&maxResults=9&part=snippet&key=AIzaSyCqBYbQd2bXFLcJaL9QRpzuceZghpV4WSQ`)
    // dữ liệu thực sự được gửi đi.
    loadApi.send();

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var item = document.getElementsByClassName("youtube-item");
    var itemStyle = document.getElementsByClassName('modal').style;
    console.log(item);
    console.log(itemStyle);
    if(item != null){
        for (var i =0; i < item.length; i++){
            item[i].onclick = function (){
                // Get the modal
                document.getElementsByClassName('modal').style.display = 'block'
            }
        }
    }
// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
});
