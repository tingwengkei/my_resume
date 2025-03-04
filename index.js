/* Define all the functions */
const setTitle = (data) => {
  // Set page title
  document.title = `${data.title} | ${data.name}`;
  document.querySelector("#profileName").innerHTML = data.name;
  document.querySelector("#profileSubTitle").innerHTML = data.sub_title;
  document.querySelector("#aboutIntro").innerHTML = data.about.intro;
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

    const eduDuration = document.createElement("span");
    eduDuration.className = "edu-duration";
    eduDuration.innerHTML = edu.duration;
    eduHeader.appendChild(eduDuration);

    li.appendChild(eduHeader);

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
    skillTitle.innerText = skill.title + ": ";

    const skillValue = document.createElement("span");
    skillValue.className = "skill-value";
    skillValue.innerText = skill.value;

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

    const expDura = document.createElement("span");
    expDura.className = "exp-title";
    expDura.innerText = `, (${exper.date})`;

    expItem.appendChild(expTitle);
    expItem.appendChild(expDura);
    expListItem.appendChild(expItem);

    if (exper.details) {
      const expDetails = document.createElement("ul");
      expDetails.className = "expDet";

      exper.details.forEach((dText) => {
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
      achDuration.innerHTML = evt.date;
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
  const adjustSize = 1;
  let element = document.getElementById("toPDF");
  element.style.minHeight = "100vh";

  element.querySelectorAll("*").forEach((el, index) => {
      let currentSize = window.getComputedStyle(el).fontSize;
      let newSize = (parseFloat(currentSize) - adjustSize) + "px";

      el.style.fontSize = newSize; // Apply new font size
  });

  html2pdf()
      .set({
          margin: [10, 10, 10, 0], // [top, left, bottom, right] padding in mm
          filename: 'download.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // Ensure content doesn't get cut off}
      })
      .from(element)
      .save()
      .then(() => {
        element.querySelectorAll("*").forEach((el, index) => {
          let currentSize = window.getComputedStyle(el).fontSize;
          let newSize = (parseFloat(currentSize) + adjustSize + 1) + "px";
    
          el.style.fontSize = newSize; // Apply new font size
      });
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
})();
