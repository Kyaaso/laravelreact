<?php

namespace App\Http\Controllers;

use Exception;
use jcobhams\NewsApi\NewsApi;
use Illuminate\Http\Request;

define("API_KEY", env('NEWSAPI_KEY'));
class NewsController extends Controller
{
    public function index(){
        $newsapi = new NewsApi(API_KEY);

        $news = $newsapi->getTopHeadLines($q=null, $sources=null, $country='ph', $category=null, $page_size=null, $page=null);
        return $news;
    }

    public function category(Request $request){
        $newsapi = new NewsApi(API_KEY);

        $news = $newsapi->getTopHeadLines($q=null, $sources=null, $country='ph', $category=$request->category, $page_size=null, $page=null);
        return $news;
    }

    public function search(Request $request){
        $newsapi = new NewsApi(API_KEY);

        try{
            $news = $newsapi->getEverything($q=$request->search, $sources=null, $domains=null, $exclude_domains=null, $from=null, $to=null, $language='en', $sort_by=null,  $page_size=null, $page=null);
        }catch(Exception){
            try{
                $news = $newsapi->getEverything($q=null, $sources=$request->search, $domains=null, $exclude_domains=null, $from=null, $to=null, $language='en', $sort_by=null,  $page_size=null, $page=null);
            }catch(Exception){
                try{
                    $news = $newsapi->getEverything($q=null, $sources=null, $domains=null, $exclude_domains=null, $from=null, $to=null, $language=$request->search, $sort_by=null,  $page_size=null, $page=null);
                }catch(Exception){
                    try{
                        $news = $newsapi->getTopHeadLines($q=$request->search, $sources=null, $country=null, $category=null, $page_size=null, $page=null);
                    }catch(Exception){
                        try{
                            $news = $newsapi->getTopHeadLines($q=null, $sources=$request->search, $country=null, $category=null, $page_size=null, $page=null);
                        }catch(Exception){
                            try{
                                $news = $newsapi->getTopHeadLines($q=null, $sources=null, $country=$request->search, $category=null, $page_size=null, $page=null);
                            }catch(Exception){
                                try{
                                    $news = $newsapi->getTopHeadLines($q=null, $sources=null, $country=null, $category=$request->search, $page_size=null, $page=null);
                                }catch(Exception){
                                    $news = "Something went wrong!";
                                }
                            }
                        }
                    }
                }
            }
        }
        
        return $news;
    }

    public function getAllowedCategory(){
        $newsapi = new NewsApi(API_KEY);
        $categories = $newsapi->getCategories();

        return $categories;
    }

    public function getAllowedLanguage(){
        $newsapi = new NewsApi(API_KEY);
        $languages = $newsapi->getLanguages();

        return $languages;
    }

    public function getAllowedCountry(){
        $newsapi = new NewsApi(API_KEY);
        $countries = $newsapi->getCountries();

        return $countries;
    }
}
