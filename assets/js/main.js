let city = document.querySelector(".city h2")

let select = document.querySelector("select")



// console.log(option);




let cities = [
            { name: "سوهاج", iso: "SHG" },
            { name: "القاهرة", iso: "C" },
            { name: "الإسكندرية", iso: "ALX" },
            { name: "الجيزة", iso: "GZ" },
            { name: "أسوان", iso: "ASN" },
            { name: "الأقصر", iso: "LX" },
            { name: "بورسعيد", iso: "PTS" },
            { name: "السويس", iso: "SUZ" },
            { name: "المنيا", iso: "MN" },
            { name: "قنا", iso: "KN" },
            { name: "أسيوط", iso: "AST" },
            { name: "الفيوم", iso: "FYM" },
            { name: "مطروح", iso: "MT" },
            { name: "كفر الشيخ", iso: "KFS" },
            { name: "الوادي الجديد", iso: "WAD" },
            { name: "القليوبية", iso: "KB" },
            { name: "الدقهلية", iso: "DK" },
            { name: "المنوفية", iso: "MNF" },
            { name: "الإسماعيلية", iso: "IS" },
            { name: "البحر الأحمر", iso: "BA" },
            { name: "البحيرة", iso: "BH" },
            { name: "الغربية", iso: "GH" },
            { name: "الشرقية", iso: "SHR" },
            { name: "دمياط", iso: "DT" },
            { name: "جنوب سيناء", iso: "JS" },
            { name: "شمال سيناء", iso: "SIN" },
            { name: "بني سويف", iso: "BNS" }
        ]

function addCitiesToSelect() {
    for (const city of cities) {
        select.innerHTML += `
        <option value="${city.iso}">${city.name}</option>
        `
    }
    
}

addCitiesToSelect()



function addCityTopSelect() {
    select.onchange = function() {
        // city.innerHTML = select.value
        for (const city of cities) {
            if(select.value == city.iso) {
                document.querySelector(".city h2").innerHTML = city.name
                getTimeFromAPI(`${select.value}`)
            }
            
            
        }
        
        
    }
}

addCityTopSelect()

let url = `https://api.aladhan.com/v1/timingsByCity?country=EG`




function getTimeFromAPI(isoName) {
    axios.get(`${url}&city=${isoName}`)
    .then((res) => {
        console.log(res);
        let dates = res.data.data.date
        let miladi = document.querySelector(".miladi")
        let day = document.querySelector(".day")
        let hijri = document.querySelector(".hijri")

        miladi.innerHTML = `
        <h2>التاريخ الميلادي : ${dates.gregorian.date}</h2>
        `
        day.innerHTML = `
        <h2>اليوم : ${dates.hijri.weekday.ar}</h2>
        `
        hijri.innerHTML = `
        <h2>التاريخ الهجري : ${dates.hijri.date}</h2>
        `

        let time = res.data.data.timings
        let Isha = document.querySelector(".Isha")
        let Maghrib = document.querySelector(".Maghrib")
        let Asr = document.querySelector(".Asr")
        let Dhuhr = document.querySelector(".Dhuhr")
        let Shroq = document.querySelector(".Shroq")
        let Fajr = document.querySelector(".Fajr")

        Isha.innerHTML = `
        <p>صلاة العشاء</p>
        <h2>${time.Isha}</h2>
        `
        Maghrib.innerHTML = `
        <p>صلاة المغرب</p>
        <h2>${time.Maghrib}</h2>
        `
        Asr.innerHTML = `
        <p>صلاة العصر</p>
        <h2>${time.Asr}</h2>
        `
        Dhuhr.innerHTML = `
        <p>صلاة الظهر</p>
        <h2>${time.Dhuhr}</h2>
        `
        Shroq.innerHTML = `
        <p>الشروق</p>
        <h2>${time.Sunrise}</h2>
        `
        Fajr.innerHTML = `
        <p>صلاة الفجر</p>
        <h2>${time.Fajr}</h2>
        `
    })
}



getTimeFromAPI(`SHG`)