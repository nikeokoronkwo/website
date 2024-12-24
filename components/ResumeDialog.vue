<script setup lang="ts">
/** Next update */
const dialog = ref<HTMLDialogElement>();

const { data, pending, error, refresh } = await useAsyncData("resume", () =>
  queryContent("resume").findOne(),
);

async function exportToPdf() {
  const html = `<div><style>
/* Base Styles */
body {
  font-family: 'Arial', sans-serif;
  color: #4a4a4a;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0.5em 0;
  font-weight: bold;
}

/* Layout */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.text-center {
  text-align: center;
}

.align-middle {
  vertical-align: middle;
}

/* Typography */
h1 {
  font-size: 1.5rem; /* For small screens, downscaled 50% */
}

@media (min-width: 768px) {
  h1 {
    font-size: 2rem; /* Downscaled for larger screens */
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: 2.5rem; /* Downscaled for large screens */
  }
}

h2 {
  font-size: 1.25rem;
}

h3 {
  font-size: 1.125rem;
}

h4, h5, h6 {
  font-size: 1rem;
}

p {
  font-size: 0.875rem; /* Smaller paragraph text */
  margin: 0.5rem 0;
}

strong {
  font-weight: bold;
}

span {
  display: block;
  margin: 0.5rem 0;
}

/* Buttons */
button, a.button-link {
  display: inline-block;
  padding: 0.375rem 0.75rem; /* Smaller padding */
  font-size: 0.875rem; /* Downscaled font size */
  text-align: center;
  color: #000;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

button:hover, a.button-link:hover {
  border-color: #1a202c;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Links */
a {
  font-size: 0.875rem; /* Smaller font size for links */
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Section Borders */
.section {
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.section:last-child {
  border-bottom: none;
}

/* Dialog */
dialog {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  background: #ffffff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

dialog[open] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

dialog .dialog-content {
  text-align: center;
}

dialog button {
  margin-top: 1rem;
}

/* Responsive Utility */
@media (min-width: 375px) {
  h1 {
    font-size: 1.25rem; /* Downscaled for small screens */
  }
}

@media (min-width: 768px) {
  h1 {
    font-size: 1.75rem; /* Downscaled for mid-sized screens */
  }

  .container {
    padding: 2rem;
  }
}
  </style><div>${data.value?.body}</div></div>`;

  await $fetch("/api/pdf", {
    method: "POST",
    body: html,
  }).then((res) => {
    //@ts-ignore
    const data = window.URL.createObjectURL(res);

    const link = document.createElement("a");
    link.href = data;
    link.download = "resume";

    link.click();
  });
}
</script>

<template>
	<button
	              class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-md"
	              @click="dialog?.showModal()"
	            >
	              Download Resume
	            </button>
	      <dialog
	        ref="dialog"
	        class="open:min-w-28 open:min-h-40 open:aspect-square open:flex open:flex-col open:items-center open:justify-center open:space-y-3 rounded-xl"
	      >
	        <div
	          class="p-6 bg-white flex flex-col items-center justify-center align-middle rounded-lg shadow-lg"
	        >
	          <div class="font-bold text-lg border-b-2">Download Type</div>
	          <br />
	          <div class="flex flex-col items-center justify-center space-y-2 pb-2">
	            <button
	              class="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg"
	              @click="exportToPdf()"
	            >
	              PDF
	            </button>
	          </div>
	          <button
	            @click="dialog?.close()"
	            class="text-sm transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-3 py-1"
	          >
	            Close
	          </button>
	        </div>
	      </dialog>
</template>
