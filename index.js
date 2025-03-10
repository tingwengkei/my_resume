const lang = new URLSearchParams(window.location.search).get("lang") ?? 'en';

function setLanguage (data) {
  return data[lang] ?? data['en'] ?? data;
}

function setChineseForTitle () {
  if (lang === 'cn') {
    document.querySelector("#summaryTitle").innerHTML = "概括";
    document.querySelector("#skillTitle").innerHTML = "技能";
    document.querySelector("#languageTitle").innerHTML = "语言";
    document.querySelector("#educationTitle").innerHTML = "学历";
    document.querySelector("#experienceTitle").innerHTML = "工作经验";
    // document.querySelector("#personalProjectTitle").innerHTML = "";
    // document.querySelector("#certificationTitle").innerHTML = "";
  }
}

/* Define all the functions */
const setTitle = (data) => {
  // Set page title
  document.title = `${data.title} | ${data.name}`;
  document.querySelector("#profileName").innerHTML = data.name;
  document.querySelector("#profileSubTitle").innerHTML = setLanguage(data.sub_title);
  document.querySelector("#aboutIntro").innerHTML = setLanguage(data.about.intro);
  document.querySelector("#contactEmail").innerHTML = data.about.contact.email;
  document
    .querySelector("#contactEmail")
    .setAttribute("href", `mailto:${data.about.contact.email}`);
  if (data.about.contact.phone) document.querySelector("#contactPhone").innerHTML = data.about.contact.phone;
  else document.querySelector("#phoneSection").style.display = "none";
};

const setLinks = (links) => {
  const linksList = document.querySelector("#linksList");
  links.forEach((link) => {
    const linkItem = document.createElement("div");
    linkItem.className = "contact-item";
    const title = document.createElement("span");
    title.className = "contact-logo";

    const icon = document.createElement("i");
    icon.className = link.iconClass;
    title.appendChild(icon);

    linkItem.appendChild(title);

    const a = document.createElement("a");
    a.className = "link-src contact-info";
    a.href = link.src;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerText = link.title;
    linkItem.appendChild(a);

    linksList.appendChild(linkItem);
  });
};

const setEducation = (education) => {
  const ul = document.querySelector("#educationList");
  education.forEach((edu) => {
    const li = document.createElement("li");

    const eduHeader = document.createElement("div");
    eduHeader.className = "edu-header";

    const eduAlma = document.createElement("span");
    eduAlma.className = "edu-alma";
    eduAlma.innerHTML = edu.alma;
    eduHeader.appendChild(eduAlma);

    // const eduDuration = document.createElement("span");
    // eduDuration.className = "edu-duration";
    // eduDuration.innerHTML = edu.duration;
    // eduHeader.appendChild(eduDuration);

    li.appendChild(eduHeader);

    const eduDuration = document.createElement("div");
    eduDuration.className = "edu-class-data";
    eduDuration.innerHTML = setLanguage(edu.duration);

    li.appendChild(eduDuration);

    const eduClassData = document.createElement("div");
    eduClassData.className = "edu-class-data";

    const eduStd = document.createElement("span");
    eduStd.className = "edu-std";
    eduStd.innerHTML = edu.std;
    eduClassData.appendChild(eduStd);

    if (edu.score) {
      const eduScore = document.createElement("span");
      eduScore.className = "edu-score";
      eduScore.innerHTML = edu.score;
      eduClassData.appendChild(eduScore);
    }

    li.appendChild(eduClassData);

    ul.appendChild(li);
  });
};

const setProjects = (projects) => {
  if (typeof projects === "undefined" || projects.length === 0) {
    document.querySelector("#projectSection").style.display = "none";
    return;
  }
  const ul = document.querySelector("#projectList");
  projects.forEach((project) => {
    const li = document.createElement("li");

    const projectHeader = document.createElement("div");
    projectHeader.className = "project-header";

    const projectTitle = document.createElement("span");
    projectTitle.className = "project-title";
    projectTitle.innerHTML = project.title;
    projectHeader.appendChild(projectTitle);

    const projectDuration = document.createElement("span");
    projectDuration.className = "project-duration";
    projectDuration.innerHTML = project.duration;
    projectHeader.appendChild(projectDuration);

    li.appendChild(projectHeader);

    if (project.link) {
      const projectLink = document.createElement("span");
      projectLink.className = "project-link";

      const a = document.createElement("a");
      a.href = project.link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.innerHTML = `${project.link}`;

      projectLink.appendChild(a);
      li.appendChild(projectLink);
    }

    const projectDesc = document.createElement("div");
    projectDesc.className = "project-desc";
    projectDesc.innerHTML = project.desc;

    li.appendChild(projectDesc);

    ul.appendChild(li);
  });
};

const setSkills = (skills,uiID) => {
  const skillList = document.querySelector("#"+uiID);

  skills.forEach((skill) => {
    const catSkillItem = document.createElement("li");
    catSkillItem.className = "cat-skill-item";

    const skillTitle = document.createElement("span");
    skillTitle.className = "cat-skill-type";
    skillTitle.innerText = setLanguage(skill.title) + ": ";

    const skillValue = document.createElement("span");
    skillValue.className = "skill-value";
    skillValue.innerText = setLanguage(skill.value);

    catSkillItem.appendChild(skillTitle);
    catSkillItem.appendChild(skillValue);
    skillList.appendChild(catSkillItem);
  });
};

const setExperience = (experiences) => {
  const expList = document.querySelector("#experienceList");
  experiences.forEach((exper) => {
    const expListItem = document.createElement("li");

    const expItem = document.createElement("div");
    expItem.className = "exp-item";

    const expOrg = document.createElement("span");
    expOrg.className = "exp-org";
    expOrg.innerHTML = exper.organization;
    expItem.appendChild(expOrg);

    const expTitle = document.createElement("span");
    expTitle.className = "exp-title";
    expTitle.innerHTML = `&nbsp- ${exper.title}`;

    // const expDura = document.createElement("span");
    // expDura.className = "exp-title";
    // expDura.innerText = `, (${exper.date})`;

    expItem.appendChild(expTitle);
    // expItem.appendChild(expDura);
    expListItem.appendChild(expItem);

    const expDetails = document.createElement("ul");
    expDetails.className = "expDet";
    const detItem = document.createElement("li");
    detItem.innerHTML = " <strong>" + setLanguage(exper.date) + "</strong>";
    expDetails.appendChild(detItem);

    let experDetails = setLanguage(exper.details);
    if (experDetails) {
      // const expDetails = document.createElement("ul");
      // expDetails.className = "expDet";

      experDetails.forEach((dText) => {
        const detItem = document.createElement("li");
        detItem.innerHTML = dText;
        expDetails.appendChild(detItem);
      });

      expListItem.appendChild(expDetails);
    }

    expList.appendChild(expListItem);
  });
};

const setEvents = (events) => {
  const footer = document.querySelector(".footer");
  events.forEach((event) => {
    const eventTitle = setCatagoryHeader(event.title);
    footer.appendChild(eventTitle);

    const eventBody = document.createElement("div");
    eventBody.className = "cat-list-body";

    const ul = document.createElement("ul");

    event.body.forEach((evt) => {
      const li = document.createElement("li");

      const achItem = document.createElement("div");
      achItem.className = "ach-item";

      const achTitle = document.createElement("div");
      achTitle.className = "ach-title";
      achTitle.innerHTML = evt.desc;
      achItem.appendChild(achTitle);

      const achDuration = document.createElement("div");
      achDuration.className = "ach-duration";
      achDuration.innerHTML = setLanguage(evt.date);
      achItem.appendChild(achDuration);

      li.appendChild(achItem);
      ul.appendChild(li);
    });

    eventBody.appendChild(ul);
    footer.appendChild(eventBody);
  });
};

const setCertification = (certifications) => {
  if (typeof certifications === "undefined" || certifications.length === 0) {
    document.querySelector("#certListSection").style.display = "none";
    return;
  }
  const certList = document.getElementById("certList");

  certifications.forEach((evt) => {
    const li = document.createElement("li");

    const achItem = document.createElement("div");
    achItem.className = "ach-item";

    const achTitle = document.createElement("div");
    achTitle.className = "ach-title";
    achTitle.innerHTML = evt.desc;
    achItem.appendChild(achTitle);

    const achDuration = document.createElement("div");
    achDuration.className = "ach-duration";
    achDuration.innerHTML = evt.date;
    achItem.appendChild(achDuration);

    li.appendChild(achItem);
    certList.appendChild(li);
  });
};

const setCatagoryHeader = (title) => {
  const catHeader = document.createElement("div");
  catHeader.className = "cat-header";

  const catIndicator = document.createElement("span");
  catIndicator.className = "cat-indicator";

  const i = document.createElement("i");
  i.className = "fa fa-chevron-right";
  i["area-hidden"] = "true";
  catIndicator.appendChild(i);
  catHeader.appendChild(catIndicator);

  const catTitle = document.createElement("span");
  catTitle.className = "cat-title";
  catTitle.innerHTML = title;
  catHeader.appendChild(catTitle);

  return catHeader;
};

function downloadPDF() {
  let lastSegment = new URLSearchParams(window.location.search).get("name");
  const adjustAllSize = 0.8;
  const adjustTitleSize = 10;

  ////whole page
  const toPDFid = 'toPDF';
  let element = document.getElementById(toPDFid);
  element.style.minHeight = "100vh";

  element.querySelectorAll("*").forEach((el, index) => {
      let currentSize = window.getComputedStyle(el).fontSize;
      let newSize = (parseFloat(currentSize) - adjustAllSize) + "px";

      el.style.fontSize = newSize; // Apply new font size
  });

  element.style.minHeight = "100vh";

  // Temporarily expand content to capture full height
  const originalHeight = element.style.height;
  element.style.height = "auto";

  ////title name
  const nameTitleID = 'profileName';
  let profileName = document.getElementById(nameTitleID);
  profileName.style.fontSize = (parseFloat(window.getComputedStyle(profileName).fontSize) - adjustTitleSize) + "px";

  html2pdf()
      .set({
          // margin: [10, 10, 0, 10], // [top, left, bottom, right] padding in mm
          margin: 10,
          filename: 'resume - '+lastSegment+'.pdf',
          image: { type: 'jpeg', quality: 1.0 },
          html2canvas: { 
            scale: 3,  // Increase scale (default is 1, try 2 or 3 for sharp text)
            useCORS: true // Fix missing images (if any)
        },
          // jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          jsPDF: { format: [210, element.scrollHeight / 3], unit: 'mm' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      })
      .from(element)
      .save()
      .then(() => {
        element.querySelectorAll("*").forEach((el, index) => {
          let currentSize = window.getComputedStyle(el).fontSize;
          let newSize = (parseFloat(currentSize) + adjustAllSize + adjustAllSize + adjustAllSize) + "px";
    
          el.style.fontSize = newSize; // Apply new font size
        });
        // Restore original height
        element.style.height = originalHeight;

        ////title name
        let profileName = document.getElementById(nameTitleID);
        profileName.style.fontSize = (parseFloat(window.getComputedStyle(profileName).fontSize) + adjustTitleSize) + "px";
      });
}


//  Entry Function, IIFE
(() => {
  let lastSegment = new URLSearchParams(window.location.search).get("name");
  if (!Object.keys(profileData).includes(lastSegment)) lastSegment = 'twk';
  let profileData2 = profileData[lastSegment];
  // Call functions to load profile
  setTitle(profileData2);
  setLinks(profileData2.links);
  setExperience(profileData2.experiences);
  setProjects(profileData2.projects);
  setSkills(profileData2.language,'languagesList');
  setSkills(profileData2.skills,'skillList');
  setEducation(profileData2.education);
  setCertification(profileData2.certifications);
  // setEvents(profileData2.events);

  setChineseForTitle();
})();
