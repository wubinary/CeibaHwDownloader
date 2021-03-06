
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
            &emsp; Download meta CSV: <input id="downloadMetaCSV" type="checkbox" onclick="return false;" checked> <br>
            <br>
        <progress id="downloadProgress" value="100" max="100"> </progress>
    </div>
    <br>
`:``) + document.getElementById('sect_cont').innerHTML;


/////////////////////////////////////////////  Utils  /////////////////////////////////////////////

const setOption = (option) => {     
    const downloadOptions = ['downloadEveryoneOption', 'downloadOntimeOption', 'downloadDelayedOption'];

    myDownloadOption = option; 
    downloadOptions.forEach((option) => { document.getElementById(option).checked = (option===myDownloadOption); });
}

const downloadLink = (link) => {
    let tab = window.open(link).blur();
};

const saveCSV = (csvCols, data, HwName) => {

    let lineArray = [];
    data.forEach(function (infoArray, index) {
        var line = infoArray.join(",");
        lineArray.push(index == 0 ? "data:text/csv; charset=utf-8,\ufeff" + csvCols + line : line);
    });
    let csvContent = lineArray.join("\n");
    let encodedUri = encodeURI(csvContent);

    let downloadTag = document.createElement("a");
    downloadTag.href = encodedUri;
    downloadTag.download = "CeibaHWDownload_"+HwName+".csv";

    document.body.append(downloadTag);
    downloadTag.click();
    document.body.removeChild(downloadTag);

    // console.log(csvContent);
}

const downloadAllHw = async () => {

    // ?????? listAll page
    if ( !window.location.href.includes('all=1') ) {
        window.open("https://ceiba.ntu.edu.tw/course_admin/hw/index.php?op=hw_corr_list&all=1&sort=");
        return;
    }

    ////////////////////////////////////// ?????????????????? //////////////////////////////////////

    // HW name
    let HwName = document.getElementsByTagName('table')[0].getElementsByTagName('caption')[0].innerText.replace('????????????: ', ''); 

    // Rows
    let trTags = Array.from(document.getElementsByTagName('tr'));

    // Iter Rows
    let data = [];
    for (let i=0; i<trTags.length; i++) {

        let tdTags = Array.from(trTags[i].getElementsByTagName('td'));

        if ( tdTags.length===0 ) 
            continue;

        // parse 
        let [stuID, stuName, hwLink, submitTime, late, haveDownload] = [
            tdTags[2].getElementsByTagName('input')[0].value,
            tdTags[3].getElementsByTagName('span')[0].innerText,
            tdTags[7].getElementsByTagName('a')[0].href,
            tdTags[6].getElementsByTagName('span')[0].innerText,
            (tdTags[6].getElementsByTagName('span')[0].className==='expr')?'late':'',
            ''
        ];

        // download
        if (submitTime // ?????????????????????
            &&
            (
                (myDownloadOption==="downloadEveryoneOption") || // everyone
                (myDownloadOption==="downloadOntimeOption" && !late) || // ontime
                (myDownloadOption==="downloadDelayedOption" && late)    // delayed
            )
        ) {
            downloadLink(hwLink);
            haveDownload = 'v';
        }

        // csv data append
        data.push([stuID, stuName, submitTime, late, haveDownload]);

        // set progress
        document.getElementById('downloadProgress').value = Math.ceil(i/trTags.length*100);

    }

    let dataCols = "stuID, stuName, submitTime, late, downloaded, \n";
    saveCSV(dataCols, data, HwName);

}


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