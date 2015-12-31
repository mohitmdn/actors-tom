/**
 * parsing
 */
var fs = require('fs'),
    mysql = require('mysql'),
    ent = require('ent'),
    request = require('request'),
    cheerio = require('cheerio');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "actors-tom"
});

con.connect(function(err){
    if(err){
        console.log('Error connecting to Mysql Db');
        return;
    }
});

con.query('truncate table `actors`');
con.query('truncate table `actors_reel`');
con.query('truncate table `actors_photos`');
con.query('truncate table `actors_resume`');
con.query('truncate table `actors_resume_extra`');

count = 0;
var getActorsPage = function() {

    console.log('actors page '+ count);

    request('https://www.istunt.com/users/search?per_page='+ count, function(err, resp, html){

        var actors_page = cheerio.load(html);
        i = 0;
        actors_page('.user-list-view').find('.small-profile').each(function(i, elem){
            i++;
            var actor_html = actors_page(this);

            var getSingleActorPage = function(actor_html, i) {

                var url_actor =  actor_html.find('.image-wrap').find('a').attr('href'),
                    profile_image_thumb = actor_html.find('.image-wrap').find('img').attr('src');

                request(url_actor, function (err, resp, body) {

                    console.log(i+' '+url_actor);

                    var $ = cheerio.load(body);
                    var name = '', gender = '', height = '', birthdate = '', weight = '', eyes = '', hair_color = '', hair_length = '',
                        waist = '', inseam = '', shoe_size = '', physique = '', dress_size = '', country_flag_img = '',
                        service_tel = '', mobile_tel = '', address = '', email = '', website = '', logo_img = '', pdf_resume = '',
                        pdf_headshot = '', unique_traits = '', ethnicity = '', profile_image = '', imdb_link = '', imdb_pro_link = '';


                    $("div.main-profile-info").each(function (i, elem) {
                        name = ent.encode($(this).find('.user-name').text().trim());
                        if ($(this).find('.country-flag-container').find('img').attr('src')) {
                            country_flag_img = $(this).find('.country-flag-container').find('img').attr('src');
                        }
                    });

                    $("div.logo-container").each(function (i, elem) {
                        logo_img = $(this).find('img').attr('src');
                    });

                    profile_image = $('.logo-body').find('img').attr('src');

                    $('.attribute-item').each(function (i, elem) {
                        var caption_text = $(this).find('.caption').text().toLowerCase().trim();
                        if (caption_text.match(/service/)) {
                            service_tel = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/mobile/)) {
                            mobile_tel = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/address/)) {
                            address = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/e-mail/)) {
                            email = $(this).find('.value').text().trim();
                        } else if (caption_text.match(/web site/)) {
                            website = $(this).find('.value').find('a').attr('href');
                        } else if (caption_text.match(/gender/)) {
                            gender = $(this).find('.value').text().trim();
                        } else if (caption_text.match(/height/)) {
                            height = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/birthdate/)) {
                            birthdate = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/weight/)) {
                            weight = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/eyes/)) {
                            eyes = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/hair color/)) {
                            hair_color = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/hair length/)) {
                            hair_length = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/waist/)) {
                            waist = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/inseam/)) {
                            inseam = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/shoe size/)) {
                            shoe_size = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/physique/)) {
                            physique = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/dress size/)) {
                            dress_size = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/pdf resume/)) {
                            pdf_resume = $(this).find('.value').find('a').attr('href');
                        } else if (caption_text.match(/pdf head shot/)) {
                            pdf_headshot = $(this).find('.value').find('a').attr('href');
                        } else if (caption_text.match(/unique traits/)) {
                            unique_traits = ent.encode($(this).find('.value').text().trim());
                        } else if (caption_text.match(/ethnicity/)) {
                            ethnicity = ent.encode($(this).find('.value').text().trim());
                        }
                    });

                    $('.profile-certified').find('a').each(function (i, elem) {
                        if ($(this).find('img').attr('src').toString().match(/imdb\.png/)) {
                            imdb_link = $(this).attr('href');
                        } else if ($(this).find('img').attr('src').toString().match(/imdb_pro\.png/)) {
                            imdb_pro_link = $(this).attr('href');
                        }
                    });

                    var query = "insert into `actors` set " +
                        "`name` = '" + name + "', " +
                        "`gender` = '" + gender + "', " +
                        "`height` = '" + height + "', " +
                        "`birthdate` = '" + birthdate + "', " +
                        "`weight` = '" + weight + "', " +
                        "`eyes` = '" + eyes + "', " +
                        "`hair_color` = '" + hair_color + "', " +
                        "`hair_length` = '" + hair_length + "', " +
                        "`waist` = '" + waist + "', " +
                        "`inseam` = '" + inseam + "', " +
                        "`shoe_size` = '" + shoe_size + "', " +
                        "`physique` = '" + physique + "', " +
                        "`dress_size` = '" + dress_size + "', " +
                        "`country_flag_img` = '" + country_flag_img + "', " +
                        "`service_tel` = '" + service_tel + "', " +
                        "`mobile_tel` = '" + mobile_tel + "', " +
                        "`address` = '" + address + "', " +
                        "`email` = '" + email + "', " +
                        "`website` = '" + website + "', " +
                        "`logo_img` = '" + logo_img + "', " +
                        "`pdf_resume` = '" + pdf_resume + "', " +
                        "`pdf_headshot` = '" + pdf_headshot + "', " +
                        "`unique_traits` = '" + unique_traits + "', " +
                        "`ethnicity` = '" + ethnicity + "', " +
                        "`profile_image` = '" + profile_image + "', " +
                        "`profile_image_thumb` = '" + profile_image_thumb + "', " +
                        "`imdb_link` = '" + imdb_link + "', " +
                        "`imdb_pro_link` = '" + imdb_pro_link + "';";


                    var actor_id = '';
                    con.query(query, function (err, result) {
                        if (err) throw err;
                        actor_id = result.insertId;
                        $('section.col-md-12').eq(0).find('.content').find('.video-container').each(function (i, elem) {
                            var reel_img = $(this).find('.video-item').find('img').attr('src'),
                                reel_name = ent.encode($(this).find('.video-caption').text().trim()),
                                reel_video = 'http:',
                                url_video = $(this).find('.video-item').find('a').attr('href');
                            request(url_video, function (err, resp, body) {
                                var url_page = cheerio.load(body);
                                reel_video += url_page('iframe').attr('src');

                                query = "insert into `actors_reel` set " +
                                    "`actor_id` = '" + actor_id + "'," +
                                    "`reel_img` = '" + reel_img + "'," +
                                    "`reel_name` = '" + reel_name + "'," +
                                    "`reel_video` = '" + reel_video + "'; ";

                                con.query(query, function (err, result) {
                                    if (err) throw err;
                                });
                            });
                        });
                        $('section.col-md-12').eq(1).find('.content').find('.photo-item').each(function (i, elem) {
                            var img_large = $(this).find('a').attr('href'),
                                img_thumb = $(this).find('img').attr('src');

                            query = "insert into `actors_photos` set " +
                                "`actor_id` = '" + actor_id + "'," +
                                "`img_thumb` = '" + img_thumb + "'," +
                                "`img_large` = '" + img_large + "';";

                            con.query(query, function (err, result) {
                                if (err) throw err;
                            })
                        });
                        $('section.col-md-12').eq(2).find('.content').find('.resumeSection').each(function (i, elem) {
                            var category = $(this).find('.resumeSectionCaption').text().trim();

                            if (['film credits', 'television', 'commercial', 'stage', 'music videos', 'motion capture'].indexOf(category.toLowerCase()) != -1) {
                                $(this).find('.resumeSectionItem').find('table').find('tr').each(function (i, elem) {
                                    var movie = ent.encode($(this).find('td').eq(0).text()),
                                        role = ent.encode($(this).find('td').eq(1).text()),
                                        actor = ent.encode($(this).find('td').eq(2).text());

                                    var query = "insert into `actors_resume` set " +
                                        "`actor_id` = '" + actor_id + "'," +
                                        "`category` = '" + category + "'," +
                                        "`movie` = '" + movie + "'," +
                                        "`role` = '" + role + "'," +
                                        "`actor` = '" + actor + "';";
                                    con.query(query, function (err, result) {
                                        if (err) throw err;
                                    })
                                });
                            } else if (['guild affiliations', 'stunt teams', 'stunt skills', 'training', 'awards', 'references', 'employment details'].indexOf(category.toLowerCase()) != -1) {
                                var content = $(this).find('.resumeSectionItem').html();
                                if (content.toString().length > 0) {
                                    var query = "insert into `actors_resume_extra` set " +
                                        "`actor_id` = '" + actor_id + "'," +
                                        "`category` = '" + category + "'," +
                                        "`content` = '" + content + "';";

                                    con.query(query, function (err, result) {
                                        if (err) throw err;
                                    })
                                }
                            }
                        });
                    });
                });

                return false;

            };

            setTimeout(function(){
                getSingleActorPage(actor_html, i);
            }, 3000);
        });

        count += 40;
        if (count <= 720) {
            setTimeout(function() {
                getActorsPage();
            }, 3000);
        }
    });

};

getActorsPage();
