import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './layouts/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { PostsComponent } from './modules/posts/posts.component';
import { RankingComponent } from './modules/ranking/ranking.component';
import { RecordComponent } from './modules/record/record.component';

const routes: Routes = [{
  path:'',
  component:DefaultComponent,
  canActivate:[IsAuthenticatedGuard],
  children: [
    {
      path:'',
      component:HomeComponent
    },
    {
      path:'record',
      component:RecordComponent
    },
    {
      path:'ranking',
      component:RankingComponent
    },
    {
      path:'posts',
      component:PostsComponent
    }
  ]
},
{
  path:'login',
  component:LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
