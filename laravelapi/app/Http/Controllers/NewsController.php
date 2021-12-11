<?php

namespace App\Http\Controllers;

use Exception;
use jcobhams\NewsApi\NewsApi;
use Illuminate\Http\Request;
class NewsController extends Controller
{
    const api_key = "ebbdc3a921fa44f39cde12eaa2b792cc";
    
    public function index(){
        $newsapi = new NewsApi(self::api_key);

        $news = $newsapi->getTopHeadLines($q=null, $sources=null, $country='ph', $category=null, $page_size=null, $page=null);
        return $news;
    }

    public function category(Request $request){
        $newsapi = new NewsApi(self::api_key);

        $news = $newsapi->getTopHeadLines($q=null, $sources=null, $country='ph', $category=$request->category, $page_size=null, $page=null);
        return $news;
    }

    public function search(Request $request){
        $newsapi = new NewsApi(self::api_key);

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
                        $news = $newsapi->getEverything($q=$request->search, $sources=null, $country=null, $category=null, $page_size=null, $page=null);
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
        $newsapi = new NewsApi(self::api_key);
        $categories = $newsapi->getCategories();

        return $categories;
    }

    public function getAllowedLanguage(){
        $newsapi = new NewsApi(self::api_key);
        $languages = $newsapi->getLanguages();

        return $languages;
    }

    public function getAllowedCountry(){
        $newsapi = new NewsApi(self::api_key);
        $countries = $newsapi->getCountries();

        return $countries;
    }
}
