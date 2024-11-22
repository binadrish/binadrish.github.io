---
layout: default
title: "Binadrish - Blog"
---


<html lang="es">    
    <div class="posts-list">
    {% for post in site.posts %}
        <div class="pst-format-container">
            <a href="{{ post.url }}" class="ag-courses-item_link">
                <div class="pst-header">
                    <div class="pst-courses-item_title">
                        {{ post.title }}
                    </div>
                    <div class="pst-courses-item_date-box">
                        <span class="pst-courses-item_date">
                            {{ post.date | date: "%B / %d /%Y" }}
                        </span>             
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

