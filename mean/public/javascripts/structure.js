//generates the layout as an html view
function generateLayout(layout)
{
    var cards = layout.data.cards;
    $("nav").html(generateNav(cards));
    for (var i = 0; i < cards.length; i++)
    {
        var card = cards[i];
        var title = card.title;
        var id = titleToId(title);
        //html view of current card
        var view = '';
        //log the current card and json representation
        log("JSON, Card "+i, JSON.stringify(card));
        //loop through items/documents of card
        for (var h = 0; h < card.items.length; h++)
        {
            view += '<div class="row">';
            //determine the type of element/document inside the card
            switch (card.items[h])
            {
                case "list":
                    view+=generateList(card.list);
                    break;
                case "projects":
                    view+=generateProjects(card.projects);
                    break;
                case "articles":
                    view+=generateArticles(card.articles);
                    break;
                case "social":
                    view+=generateSocial(card.social);
                    break;
                case "forum":
                    view+=generateForm(card.forum);
            }
            view += '</div>';
        }
        //set the title of the card
        $("h1.title-"+id).html(title);
        //place the generated view in container
        $("div."+id).html(view);
        //log the current card and html representation
        log("HTML, Card "+i, view);
    }
}

function generateList(list, linked)
{
    //html view
    var view = "<ul class='center'>";
    //add each element of the list to the view
    for (var i = 0; i < list.length; i++)
    {
        //list with no hyperlinks
        if (!linked)
            view += "<li>" + list[i] + "</li>";
        //list with hyperlinks
        else
        {
            if (list[i].hasOwnProperty("github"))
                view += "<a href='"+ list[i].github+"'><li>Github</li></a>";
            view += "<a href='" + list[i].link + "'><li>" + list[i].title + "</li></a>";
        }
    }
    //return the view
    return view+"</ul>";
}

/*
 * generates a html view for projects (array)
 * projects: {
 *   title: String, (Mandatory)
 *   type: "Group", (Mandatory)
 *   projects: [] (Mandatory)
 * }
 * returns and html view
 */
function generateProjects(projects)
{
    //html view with centered elements
    var view = "<div class='center'>";

    for (var i = 0; i < projects.length; i++)
    {
        //curent project
        var project = projects[i];
        //bootstrap divider
        view+="<div class='col-md-4 col-sm-6 col-xs-12'>";
        if (project.type == "group")
            view+=generateProject(project)+"</div>";
    }
    //return the view
    return view+"</div>";
}

/*
 * helper function for generateProjects that generates an html view for a project (object)
 * project: {
 *   title: String, (Mandatory)
 *   link: String, (Mandatory)
 *   github: String
 * }
 */
function generateProject(project)
{
    //html view
    var view = "<h2>"+project.title+"</h2>";
    for (var i = 0; i < project.projects.length; i++)
    {
        //ensures project type is correct
        if (project.type != "group")
            return "<h1>Error project data sent is wrong type! "+project.type+"</h1>";
        //add project title
        //view += "<a data-toggle='collapse' class='collapsed' aria-expanded='false'>";
    }
    //generate list with links
    view += generateList(project.projects, true);
    //return the view
    return view;
}

/*
 * generates an html view for articles (array)
 *
 */
function generateArticles(articles)
{
    var view = "<div class='center'>";
    for (var i = 0; i < articles.length; i++)
    {
        view += generateArticle(articles[i]);
    }
    return view+"</div>";
}

/*
 * helper function for generateArticles that generates an html view for an article (object)
 *
 */
function generateArticle(article)
{
    var view = "<div class='col-md-4 col-sm-6 col-xs-12 center'><h2>"+article.title+"</h2>";
    for (var i = 0; i < article.paragraphs.length; i++)
        view += "<p>"+article.paragraphs[i];+"</p>";
    return view+"</div>";
}

function generateSocial(social)
{
    var view = "<div class='center'><h2>Social</h2>";
    var container = "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12 icon-container'>";
    if (social.hasOwnProperty("facebook"))
        view += container + "<a href='"+social.facebook.src+"'><img alt='facebook' src='"+social.facebook.icon+"'></a><h3>Facebook</h3></div>";
    if (social.hasOwnProperty("email"))
        view += container + "<a href='mailto:"+social.email.src+"'><img alt='email' src='"+social.email.icon+"'></a><h3>Email</h3></div>";
    if (social.hasOwnProperty("linkedin"))
        view += container + "<a href='"+social.linkedin.src+"'><img alt='linkedin' src='"+social.linkedin.icon+"'></a><h3>Linkedin</h3></div>";
    if (social.hasOwnProperty("twitter"))
        view += container + "<a href='"+social.twitter.src+"'><img alt='twitter' src='"+social.twitter.icon+"'></a><h3>Twitter</h3></div>";
    return view+"</div>";
}

function generateNav(cards)
{
    var viewDesktop = "<ul class='nav nav-pills pull-right'>";
    var viewMobile = "<div id='menu-container' class='dropdown'>" +
        "<button id='menu' class='hidden-sm hidden-md hidden-lg btn-lg dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>" +
        "Menu<span class='carrot'></span></button>" +
        "<ul class='dropdown-menu'>" +
        "<li class='dropdown-header'>Navigation</li>";
    for(var i = 0; i < cards.length; i++)
    {
        viewDesktop+=generatePill(cards[i]);
        viewMobile+=generateMenuItem(cards[i]);
    }
    viewMobile+="</li></ul></div>";
    viewDesktop+=viewMobile+"</ul>";
    //return view current nav-message is temporarily hardcoded.
    return viewDesktop+"<h1><a href='https://Cynicalbird.github.io/' id='nav-title'>Alex</a></h1><p id='nav-message'>Website in construction</p>";
}

function generatePill(card)
{
    var id = titleToId(card.title);
    var view = "<li class='hidden-xs' role='presentation' id='nav-"+id+"'"+"><a href='#"+id+"'>"+id;
    return view+"</a></li>";
}

function generateMenuItem(card)
{
    var id = titleToId(card.title);
    var view = "<li><a href='#"+id+"'>"+id;
    return view+"</a></li>";
}

function generateForm(form)
{
    //hard coded title and form post for now
    var view = '<div class="center form"><h2>Leave me a message</h2>';
    for (var i = 0; i < form.fields.length; i++)
    {
        view +='<div class="col-xs-12"><input type="text" placeholder="'+form.fields[i]+'"></div>'
    }
    return view+'</div>';
}
