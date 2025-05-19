---
layout: default
title: "Binadrish - Blog"
---


<html lang="es">
        <header>
        <h1>Transformando datos en <span>historias</span></h1>
            <p>Una colección de crónicas, columnas y artículos sobre informatica y sus aplicaciones en la vida diaria.</p>
        </header>
        <section class="cover">
            {% assign latest_post = site.posts.first %}
                    <a href="{{ latest_post.url }}" class="cover-link">
                    <div class="cover-img">
                            {% if latest_post.img %}
                                <img src="{{ latest_post.img }}" alt="{{ latest_post.title }}">
                            {% endif %}
                        </div>
                        <div class="cover-info" >
                            <div class="cover-info-head">
                                <div class="cover-info-title">
                                    <h2>{{ latest_post.title }}</h2>
                                </div>
                                <div class="cover-info-date">
                                    <i><span>{% include fecha_es.html date=latest_post.date %}</span></i>
                                </div>
                                <div class="cover-info-description">
                                   <p>
                                   {{ latest_post.excerpt }}
                                   </p> 
                                </div>
                                <div class="cover-info-tag">
                                    {% for cat in latest_post.categories %}
                                        <span class="tag">{{ cat }}</span>
                                    {% endfor %}
                                </div>
                            </div>
                        </div>
                    </a>
        </section> 
        <section class="posts">
            <h1>Todas las publicaciones</h1>
            <p></p>
            <section class="all-posts">
                {% for post in site.posts %}
                    <div class="post-container">
                        <a href="{{ post.url }}" class="post-link">
                        <div class="post-img">
                            {% if post.img %}
                                <img src="{{ post.img }}" alt="{{ post.title }}">
                                {% endif %}  
                            </div>
                            <div class="post-info">
                                <div class="post-info-head">
                                    <div class="post-info-title">
                                        <h2>{{ post.title }}</h2>
                                    </div>
                                    <div class="post-info-date">
                                       <p><i><span>{% include fecha_es.html date=post.date %}</span></i></p>
                                    </div>
                                    <div class="post-info-tag">
                                        {% for cat in post.categories %}
                                            <span class="tag">{{ cat }}</span>
                                        {% endfor %}  
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                {% endfor %}
            </section>
        </section>

