const courses = [
      { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
      { code: "WDD 231", name: "Front-End Development I", credits: 3, completed: false },
      { code: "CSE 110", name: "Programming Principles", credits: 2, completed: true },
      { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true },
      { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, completed: true }
    ];

    function displayCourses(filter = "all") {
      const container = document.getElementById("courses-container");
      container.innerHTML = "";
      let filteredCourses = courses;
      if (filter === "wdd") filteredCourses = courses.filter(c => c.code.startsWith("WDD"));
      if (filter === "cse") filteredCourses = courses.filter(c => c.code.startsWith("CSE"));

      let total = 0;
      filteredCourses.forEach(course => {
        const div = document.createElement("div");
        div.className = `course ${course.completed ? "completed" : ""}`;
        div.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>Credits: ${course.credits}</p>`;
        container.appendChild(div);
        total += course.credits;
      });
      document.getElementById("total-credits").textContent = total;
    }

    document.getElementById("all").addEventListener("click", () => displayCourses("all"));
    document.getElementById("wdd").addEventListener("click", () => displayCourses("wdd"));
    document.getElementById("cse").addEventListener("click", () => displayCourses("cse"));

    window.addEventListener("DOMContentLoaded", () => displayCourses());