import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = ()=>{
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={
                        <>
                            <SignedIn><Dashboard /></SignedIn>
                            <SignedOut><RedirectToSignIn /></SignedOut>
                        </>
                    } />
                    <Route path="/upload" element={
                        <>
                            <SignedIn><Upload /></SignedIn>
                            <SignedOut><RedirectToSignIn /></SignedOut>
                        </>
                    } />
                    <Route path="/my-files" element={
                        <>
                            <SignedIn><MyFiles /></SignedIn>
                            <SignedOut><RedirectToSignIn /></SignedOut>
                        </>
                    } />
                    <Route path="/subscriptions" element={
                        <>
                            <SignedIn><Subscription /></SignedIn>
                            <SignedOut><RedirectToSignIn /></SignedOut>
                        </>
                    } />
                    <Route path="/transactions" element={
                        <>
                            <SignedIn><Transactions /></SignedIn>
                            <SignedOut><RedirectToSignIn /></SignedOut>
                        </>
                    } />
                    <Route path="file/:fileId" element={
                        <>
                            <PublicFileView />
                        </>
                    }/>
                    <Route path="/*" element={<RedirectToSignIn />} />

     
    </Routes>
    </BrowserRouter>
  )
}

export default App;