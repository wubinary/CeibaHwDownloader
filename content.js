
var myDownloadOption = 'downloadEveryoneOption';
var in_listAll_page = window.location.href.includes('all=1');

document.getElementById('nav_sect').innerHTML += `
    <li>
        |
        <a href="#" id="download_all_hw" >` + ((in_listAll_page)?`[Download all]`:`[List all]`) + `</a>
    </li>
`;

document.getElementById('sect_cont').innerHTML = ((in_listAll_page)?`
    <div style="border-width:3px;border-style:dashed;border-color:#42650F;padding:5px;">
        [Download all] options: <br>
            &emsp; Everyones : <input id="downloadEveryoneOption" type="checkbox" checked> <br>
            &emsp; --------------------- <br>
            &emsp; On time only: <input id="downloadOntimeOption" type="checkbox"> <br>
            &emsp; Delayed only: <input id="downloadDelayedOption" type="checkbox"> <br>
            <br>
        Meta CSV: <br>
            &emsp; Download meta CSV: <input id="downloadMetaCSV" type="checkbox" onclick="return false;" checked> 
    </div>
    <br>
`:``) + document.getElementById('sect_cont').innerHTML;


/////////////////////////////////////////////  Utils  /////////////////////////////////////////////

const downloadOptions = ['downloadEveryoneOption', 'downloadOntimeOption', 'downloadDelayedOption'];
const setOption = (option) => { 
    myDownloadOption = option; 
    downloadOptions.forEach((option) => { document.getElementById(option).checked = (option===myDownloadOption); });
}

const downloadLink = (link) => {

    let downloadTag = document.createElement("a");
    downloadTag.href = link;
    // downloadTag.download = "a.pdf";

    document.body.appendChild(downloadTag);
    // downloadTag.click();
    document.body.removeChild(downloadTag);

};

const downloadAllHw = async () => {

    // 跳到 listAll page
    if ( !window.location.href.includes('all=1') ) {
        window.open("https://ceiba.ntu.edu.tw/course_admin/hw/index.php?op=hw_corr_list&all=1&sort=");
    }

    /////////////////////////////////////////////////////////////////////////////////////////

    // download files
    // let aTags = Array.from(document.getElementsByTagName('a'));
    // let hwLinks = aTags.filter( 
    //         a => a.href.includes('hw_download') 
    //     ).map( 
    //         a => a.href 
    //     );

    // for (let i=0; i<hwLinks.length; i++) {
        
    //     downloadLink(hwLinks[i]);
    //     // await window.open(hwLinks[i]);
    // }

    /////////////////////////////////////////////////////////////////////////////////////////

    // Get Rows
    let trTags = Array.from(document.getElementsByTagName('tr'));

    // Iter Rows
    for (let i=0; i<trTags.length; i++) {

        let tdTags = Array.from(trTags[i].getElementsByTagName('td'));

        if ( tdTags.length===0 ) 
            continue;

        // let stuID = tdTags[2].getElementsByTagName('input')[0].value;
        // let hwLink = tdTags[7].getElementsByTagName('a')[0].href;
        // let date = tdTags[6].getElementsByTagName('span')[0].innerText;
        // let late = tdTags[6].getElementsByTagName('span')[0].className==='expr';

        let [stuID, stuName, hwLink, submitDate, late] = [
            tdTags[2].getElementsByTagName('input')[0].value,
            tdTags[3].getElementsByTagName('span')[0].innerText,
            tdTags[7].getElementsByTagName('a')[0].href,
            tdTags[6].getElementsByTagName('span')[0].innerText,
            (tdTags[6].getElementsByTagName('span')[0].className==='expr')?'late':''
        ];

        console.log([stuID, stuName, hwLink, submitDate, late]);

    }

}

// // get rows
// var trTags = Array.from(document.getElementsByTagName('tr'));

// for (let i=0; i<trTags.length; i++) {

//     let tdTags = Array.from(trTags[i].getElementsByTagName('td'));

//     if ( tdTags.length===0 ) 
//         continue;

//     let stuID = tdTags[2].getElementsByTagName('input')[0].value;
//     let hwLink = tdTags[7].getElementsByTagName('a')[0].href;
//     let date = tdTags[6].getElementsByTagName('span')[0].innerText;
//     let late = tdTags[6].getElementsByTagName('span')[0].className==='expr';

// }


// Download Button
document.getElementById("download_all_hw").addEventListener("click", downloadAllHw );

// Options
if (in_listAll_page) {
    document.getElementById("downloadEveryoneOption").addEventListener("change", function() {
        if (this.checked){ setOption("downloadEveryoneOption") } else { setOption(""); }
    });
    document.getElementById("downloadOntimeOption").addEventListener("change", function() {
        if (this.checked){ setOption("downloadOntimeOption") } else { setOption(""); }
    });
    document.getElementById("downloadDelayedOption").addEventListener("change", function() {
        if (this.checked){ setOption("downloadDelayedOption") } else { setOption(""); }
    });
}