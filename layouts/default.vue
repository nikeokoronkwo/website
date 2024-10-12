<script setup lang="tsx">
const headerItems = [
  {
    name: "Homepage",
    route: "/",
  },
  {
    name: "Projects",
    route: "/projects",
  },
  {
    name: "Blog",
    route: "/blog",
  },
];

function Header() {
  return (
    <div class="sticky top-0 pt-5 h-16 w-screen flex flex-row justify-between items-center space-x-10 mx-auto bg-white pb-5 drop-shadow-sm">
      <div class="highlight-font text-xl pl-5">nikechukwu</div>
      <div class="flex flex-row justify-center items-center space-x-7 mr-auto">
        {headerItems.map((h) => (
          <a href={h.route} class="underliner">
            <div class="text-center font-semibold">{h.name}</div>
          </a>
        ))}
      </div>
      <div class="text-transparent text-xl pl-5">nikechukwu</div>
    </div>
  );
}

function Footer() {
  return (
    <footer class="flex flex-col mt-auto">
      <div class="flex flex-row justify-between items-center px-10 py-5">
        <small class="flex flex-col text-gray-700">
          <span>(C) Nikechukwu Okoronkwo 2024</span>
          <span>All Rights Reserved.</span>
        </small>
        <div class="flex flex-row space-x-3">
          <IconList list={links} />
        </div>
      </div>
    </footer>
  );
}
</script>

<template>
  <div class="flex flex-col bg-transparent h-screen">
    <Header />
    <div>
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Beiruti:wght@200..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Playwrite+BR:wght@100..400&display=swap");

.major-font {
  font-family: "Beiruti", sans-serif;
}

.highlight-font {
  font-family: "Playwrite BR", cursive;
  font-optical-sizing: auto;
  font-style: normal;
}

@keyframes underline {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

.underliner {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.underliner::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px; /* Adjust the thickness of the underline */
  background-color: black; /* Use the text color */
  transform: translate3d(-100%, 0, 0);
  transition: transform 0.3s ease;
}

.underliner:hover::after {
  transform: translate3d(0, 0, 0);
}
</style>
