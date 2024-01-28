import { RestService } from './rest-service';
import { PostsComponent } from './posts-component';

const component = new PostsComponent(new RestService());
component.init();
