$(document).ready(function() {
	$('#searchUser').on('keyup',function(e){
		let username =e.target.value;

		//Making request to Github
		$.ajax({
			url:'https://api.github.com/users/'+username,
			data: {
				clint_id:'472a6ad78bf631160941',
				clint_secret:'58616d753a558af63186b7133873a0d940c30d8b'
			}
		}).done(function(user){
			$.ajax({
				url:'https://api.github.com/users/'+username+'/repos',
			data: {
				clint_id:'472a6ad78bf631160941',
				clint_secret:'58616d753a558af63186b7133873a0d940c30d8b',
				sort:'created_at',
				per_page:5
			}
			}).done(function(repos){
				$.each(repos,function(index,repo){
					$('#repos').append(`
						<div class="well">
							<div class="row">
								<div class="col-md-7">
									<strong>${repo.name}</strong>:${repo.description}
								</div>
								<div class="col-md-3">
									<span class="label label-default"> Forks:${repo.forks_count}</span>
									<span class="label label-primary">Watcher:${repo.watchers_count}</span>
									<span class="label label-success">Stars:${repo.stargazers_count}</span>
								</div>
								<div class="col-md-2">
									<a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo page</a>
								</div>
							</div>
						</div>
						`);
				});
			});
			$('#profile').html(`
				<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title">${user.name}</h3>
				  </div>
				  <div class="panel-body">
				    <div class="row">
						<div class="col-md-3">
							<img  class="thumbnail avatar" src="${user.avatar_url}" alt="" />
							<a target="_blank" href="${user.html_url}" class="btn btn-primary btn-block">View profile</a>
						</div>
						<div class="col-md-9">
							<span class="label label-default">Public Repo:${user.public_repo}</span>
							<span class="label label-primary">Public Gists:${user.public_gists}</span>
							<span class="label label-success">Followers:${user.followers}</span>
							<span class="label label-info">Folling:${user.folling}</span>
							<br><br>
							<ul class="list-group">
								<li class="list-group-item">Company: ${user.company}</li>
								<li class="list-group-item">Websit/bog:${user.blog}</li>
								<li class="list-group-item">Location:${user.location}</li>
								<li class="list-group-item">Member Since${user.created_at}</li>
							</ul>
						</div>
				    </div>
				  </div>
				</div>
				<h3 class="page-header">Letast Repo</h3>
				<div id="repos"></div>
				`);
		});

	});
});