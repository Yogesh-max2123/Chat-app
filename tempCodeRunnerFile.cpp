#pragma GCC optimize("O3,unroll-loops")
#include <bits/stdc++.h>
#define ll long long
#define modulo 10000007
#define vecCreate long long int n ,x; cin>>n>>x; vector<long long int> a(n); for(long long int i=0;i<n;i++) cin >> a[i];
#define vecCreate2 long long int n,x; cin>>n>>x; vector<long long int> a(n); for(long long int i=0;i<n;i++) cin >> a[i];
#define vstring long long int n,q; cin>>n>>q; vector<string> a(n); for(long long int i=0;i<n;i++) cin>>a[i];
#define nl endl
const int MOD = 998244353;

const int MAXN = 500000;
vector<long long> fact(MAXN+1), invfact(MAXN+1);
using namespace std;
void solve();
int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    int t; cin >> t;
    while (t--)
    solve();
    return 0;
}

 
long long solve(long long a, long long b, long long mod) {
    long long res = 1;
    a %= mod;
    while(b > 0) {
        if(b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

void precomputeFactorials() {
    fact[0] = 1;
    for (int i = 1; i <= MAXN; i++){
        fact[i] = fact[i-1] * i % MOD;
    }
    invfact[MAXN] = solve(fact[MAXN], MOD-2, MOD);
    for (int i = MAXN; i >= 0; i--){
        if(i) invfact[i-1] = invfact[i] * i % MOD;
    }
}
 


void solve(){
    vector<int> c(26);
    int N = 0;
    for (int i = 0; i < 26; i++){
        cin >> c[i];
        N += c[i];
    }

    int oddCount = (N + 1) / 2;
    int evenCount = N / 2;
    
    vector<int> positive;
    for (int i = 0; i < 26; i++){
        if(c[i] > 0)
            positive.push_back(c[i]);
    }
    
 
    vector<int> dp(oddCount+1, 0);
    dp[0] = 1;
    for (int cnt : positive) {
       
        for (int j = oddCount; j >= cnt; j--){
            dp[j] = (dp[j] + dp[j - cnt]) % MOD;
        }
    }
    int coef = dp[oddCount]; 
    
   
    long long denom = 1;
    for (int cnt : positive) {
        denom = denom * fact[cnt] % MOD;
    }
    
    
    long long arrangements = fact[oddCount] * fact[evenCount] % MOD;
    arrangements = arrangements * solve(denom, MOD-2, MOD) % MOD;

   
    long long ans = arrangements * coef % MOD;
    cout << ans % MOD << "\n";
}