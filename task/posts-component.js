export class PostsComponent {
  constructor(restService) {
    this.restService = restService;
  }

  async init() {
    const posts = await this.restService.fetchData(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const content = posts.slice(0, 5);
    this.render(content);
  }

  async render(content) {
    const ol = document.createElement("ol");

    document.body.append(ol);
    content.forEach((post) => ol.append(this.createElement(post)));
  }

  createElement(post) {
    const li = document.createElement("li");

    const titleEl = document.createElement("h2");
    titleEl.innerText = post.title;

    const descriptionEl = document.createElement("p");
    descriptionEl.innerText = post.body;

    li.append(titleEl);
    li.append(descriptionEl);
    return li;
  }
}
