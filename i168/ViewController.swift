//
//  ViewController.swift
//  i168
//
//  Created by Hiromu Ochiai on 2019/08/06.
//  Copyright © 2019 otiai10. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate {

    let KCURL = "http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"

    @IBOutlet weak var game: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()
        self.game.navigationDelegate = self
        let req = URLRequest(url: URL(string: KCURL)!)
        self.game.load(req)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        let url = webView.url!
        if url.absoluteString == KCURL {
            let script = """
                // i168: Scale Page To Fit
                var meta = document.createElement('meta');
                meta.name = 'viewport';
                meta.content = 'width=device-width';
                document.querySelector('head').appendChild(meta);
                // i168: Hide DMM Navigation Bar
                document.body.style.position = 'absolute';
                document.body.style.top = '-77px';
                // i168: Disable Scroll
                document.body.style.overflow = 'hidden';
            """
            webView.evaluateJavaScript(script)
        }
    }
}

