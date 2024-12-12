---
layout: default
title: "Binadrish - Blog"
---


<html lang="es">    
    <div class="landing-msg-container">
        <section class="landing-msg">
                    <h2>Transformando datos en historias</h2>
                    <p>Mi misión es guiarte a través del mundo del analisis y las ciencias de la computación para encontrar soluciones a problemas reales
                    </p> <!-- Cambia 'descripcion' por el campo adecuado -->
        </section>
        <div class="landing-img">
            <img src="/assets/images/landing.gif" alt="{{ post.title }}">
        </div>
    </div>
    <div class="blog-title-container">
        <h2 class="blog-title" id="blog">Blog</h2>
        <div class="blog-title-description">
            <p>Desde una perspectiva informal, hablamos de datos en geointeligencia, cartografía, deportes y otros.</p>
        </div>
    </div>
    <div class="posts-list">
    {% for post in site.posts %}
        <div class="pst-format-container">
            <a href="{{ post.url }}" class="ag-courses-item_link">
                <div class="pst-header">
                    <div class="pst-courses-item_title">
                        <div class="pst-item-title-container">
                            {{ post.title }}
                        </div>
                        <div class="pst-courses-item_date">
                            {{ post.date | date: "%B / %d /%Y" }}    
                        </div>
                    </div>
                    <div class="pst-description">
                        {{ post.excerpt }}
                    </div>
                </div>
                    {% if post.img %}
                    <img src="{{ post.img }}" alt="{{ post.title }}">
                    {% endif %}  
            </a>
        </div>
    {% endfor %}
    </div>

