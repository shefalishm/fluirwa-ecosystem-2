import { useState, useEffect, useRef, useMemo } from "react";

const CATEGORIES = [
  {
    id: "tokenization",
    name: "Tokenization Providers",
    icon: "◈",
    color: "#00D4AA",
    description: "End-to-end platforms for converting real-world assets into digital tokens on blockchain infrastructure",
    vendors: [
      { name: "Zoniqx", url: "https://zoniqx.com", desc: "Silicon Valley fintech powering fully automated RWA deployment via zProtocol (DyCIST/ERC-7518), zConnect, zCompliance, zPay, and zIdentity across public, private, and hybrid chains", tags: ["ERC-7518","Compliance Automation","Multi-Chain","Enterprise"], hq: "USA", founded: 2020 },
      { name: "Securitize", url: "https://securitize.io", desc: "SEC-registered platform with BlackRock BUIDL fund, $1B+ on-chain assets", tags: ["SEC Regulated","Transfer Agent","ATS"], hq: "USA", founded: 2017 },
      { name: "Tokeny", url: "https://tokeny.com", desc: "Apex Group-acquired, $32B+ tokenized, ERC-3643 standard creator", tags: ["Enterprise","ERC-3643","Compliance"], hq: "Luxembourg", founded: 2017 },
      { name: "Polymath / Polymesh", url: "https://polymesh.network", desc: "Purpose-built blockchain for regulated securities with built-in identity & governance", tags: ["L1 Chain","Regulated","Securities"], hq: "Canada", founded: 2017 },
      { name: "RealT", url: "https://realt.co", desc: "Fractional real estate on Ethereum, $150M+ tokenized, daily stablecoin dividends", tags: ["Real Estate","Fractional","DeFi"], hq: "USA", founded: 2019 },
      { name: "DigiShares", url: "https://digishares.io", desc: "White-label tokenization for real estate across 40+ countries, 90+ wallet integrations", tags: ["White-Label","Real Estate","Global"], hq: "Denmark", founded: 2018 },
      { name: "Brickken", url: "https://brickken.com", desc: "SaaS tokenization platform for equity, real estate & revenue-sharing tokens", tags: ["SaaS","Equity","Self-Service"], hq: "Spain", founded: 2020 },
      { name: "Centrifuge", url: "https://centrifuge.io", desc: "DeFi protocol for tokenizing real-world credit assets, integrated with MakerDAO", tags: ["DeFi","Credit","MakerDAO"], hq: "Germany", founded: 2017 },
      { name: "Ondo Finance", url: "https://ondo.finance", desc: "Institutional-grade tokenized US Treasuries and bonds for on-chain yield", tags: ["Treasuries","Yield","Institutional"], hq: "USA", founded: 2021 },
      { name: "Maple Finance", url: "https://maple.finance", desc: "On-chain institutional capital market for tokenized lending and credit", tags: ["Lending","Credit","Institutional"], hq: "Australia", founded: 2020 },
      { name: "Goldfinch", url: "https://goldfinch.finance", desc: "Decentralized credit protocol bringing real-world lending to DeFi", tags: ["Credit","Emerging Markets","DeFi"], hq: "USA", founded: 2020 },
      { name: "Backed Finance", url: "https://backed.fi", desc: "Tokenized securities tracking real-world assets on public blockchains", tags: ["Securities","Permissionless","EU"], hq: "Switzerland", founded: 2021 },
      { name: "Matrixdock", url: "https://matrixdock.com", desc: "Tokenized real-world assets including T-Bills by Matrixport", tags: ["T-Bills","Asia","Matrixport"], hq: "Singapore", founded: 2023 },
      { name: "Superstate", url: "https://superstate.co", desc: "Regulated tokenized fund products for institutional on-chain access", tags: ["Funds","Regulated","Institutional"], hq: "USA", founded: 2023 },
      { name: "Hashnote", url: "https://hashnote.com", desc: "Institutional DeFi and tokenized yield products with compliance rails", tags: ["Yield","Institutional","DeFi"], hq: "USA", founded: 2022 },
      { name: "OpenEden", url: "https://openeden.com", desc: "Tokenized T-Bills vault providing on-chain access to US Treasury yields", tags: ["T-Bills","Vault","Yield"], hq: "Singapore", founded: 2022 },
      { name: "InvestaX", url: "https://investax.io", desc: "Licensed STO platform for tokenized securities and alternative investments", tags: ["STO","Licensed","APAC"], hq: "Singapore", founded: 2018 },
      { name: "Vertalo", url: "https://vertalo.com", desc: "Digital asset management and cap table platform for tokenized securities", tags: ["Cap Table","Transfer Agent","Analytics"], hq: "USA", founded: 2018 },
      { name: "tZERO", url: "https://tzero.com", desc: "SEC-registered ATS for trading tokenized securities and digital assets", tags: ["ATS","SEC","Trading"], hq: "USA", founded: 2014 },
      { name: "Republic", url: "https://republic.com", desc: "Investment platform offering tokenized equity, real estate, and crypto assets", tags: ["Crowdfunding","Equity","Retail"], hq: "USA", founded: 2016 },
      { name: "Swarm Markets", url: "https://swarm.com", desc: "BaFin-regulated DeFi platform for tokenized stocks, bonds, and real estate", tags: ["BaFin","DeFi","Stocks"], hq: "Germany", founded: 2018 },
      { name: "Midas", url: "https://midas.app", desc: "Tokenized yield-bearing assets including T-Bills and staked ETH baskets", tags: ["Yield","T-Bills","Baskets"], hq: "Switzerland", founded: 2023 },
      { name: "Clearpool", url: "https://clearpool.finance", desc: "Decentralized capital markets protocol for institutional unsecured lending", tags: ["Lending","Institutional","DeFi"], hq: "Singapore", founded: 2021 },
      { name: "Credix", url: "https://credix.finance", desc: "DeFi credit marketplace connecting institutional capital to LatAm fintech lending", tags: ["Credit","LatAm","DeFi"], hq: "Belgium", founded: 2021 },
      { name: "Parcl", url: "https://parcl.co", desc: "Tokenized real estate index trading on Solana with synthetic exposure", tags: ["Real Estate","Solana","Synthetic"], hq: "USA", founded: 2022 },
      { name: "Lofty", url: "https://lofty.ai", desc: "Fractional real estate tokenization on Algorand with $50 minimum investment", tags: ["Real Estate","Algorand","Fractional"], hq: "USA", founded: 2021 },
      { name: "Propy", url: "https://propy.com", desc: "Blockchain-based real estate transaction platform with NFT deed support", tags: ["Real Estate","NFT Deeds","Transactions"], hq: "USA", founded: 2016 },
      { name: "StegX", url: "https://stegx.io", desc: "Institutional marketplace for tokenized real estate on Hedera via ERC-7518", tags: ["Real Estate","Hedera","Institutional"], hq: "UAE", founded: 2023 },
      { name: "Homebase", url: "https://homebasedao.io", desc: "Fractional real estate investing through tokenized property ownership", tags: ["Real Estate","DAO","Fractional"], hq: "USA", founded: 2022 },
      { name: "RedSwan CRE", url: "https://redswan.io", desc: "Commercial real estate tokenization marketplace for institutional properties", tags: ["CRE","Marketplace","Institutional"], hq: "USA", founded: 2019 },
      { name: "Landshare", url: "https://landshare.io", desc: "Tokenized real estate yield protocol on BNB Chain with property-backed tokens", tags: ["Real Estate","BNB","Yield"], hq: "USA", founded: 2021 },
      { name: "IX Swap", url: "https://ixswap.io", desc: "AMM-style DEX for trading security tokens and tokenized RWAs", tags: ["DEX","Security Tokens","AMM"], hq: "Liechtenstein", founded: 2021 },
      { name: "ABridge", url: "https://abridge.io", desc: "Asset tokenization infrastructure connecting TradFi rails to DeFi protocols", tags: ["Infrastructure","Bridge","TradFi"], hq: "USA", founded: 2022 },
      { name: "Blocksquare", url: "https://blocksquare.io", desc: "White-label tokenization protocol for real estate marketplaces", tags: ["White-Label","Real Estate","Protocol"], hq: "Slovenia", founded: 2017 },
      { name: "Chintai", url: "https://chintai.io", desc: "Regulated tokenization platform for digital securities on custom L1", tags: ["Regulated","L1","Securities"], hq: "Singapore", founded: 2019 },
      { name: "Stobox", url: "https://stobox.io", desc: "STO dashboard and tokenization platform for equity and real estate", tags: ["STO","Dashboard","Equity"], hq: "USA", founded: 2019 },
      { name: "TokenFi", url: "https://tokenfi.com", desc: "No-code tokenization platform by FLOKI ecosystem for RWA creation", tags: ["No-Code","FLOKI","Retail"], hq: "Global", founded: 2023 },
      { name: "Plume Network", url: "https://plumenetwork.xyz", desc: "Modular L2 blockchain purpose-built for RWA tokenization and DeFi composability", tags: ["L2","Modular","RWAfi"], hq: "USA", founded: 2023 },
      { name: "Mantra Chain", url: "https://mantrachain.io", desc: "L1 blockchain designed for tokenized RWAs with regulatory compliance modules", tags: ["L1","Compliance","RWA"], hq: "UAE", founded: 2020 },
      { name: "Polymesh Association", url: "https://polymesh.network", desc: "Governs the Polymesh blockchain for institutional-grade security token issuance", tags: ["Governance","L1","Institutional"], hq: "Liechtenstein", founded: 2020 },
      { name: "ADDX", url: "https://addx.co", desc: "MAS-licensed private market exchange for tokenized alternative investments", tags: ["Exchange","MAS","Private Markets"], hq: "Singapore", founded: 2017 },
      { name: "Liquefy", url: "https://liquefy.com", desc: "Hong Kong tokenization platform for real estate and private equity", tags: ["APAC","Real Estate","Private Equity"], hq: "Hong Kong", founded: 2018 },
      { name: "Archax", url: "https://archax.com", desc: "FCA-regulated digital securities exchange, broker and custodian", tags: ["FCA","Exchange","UK"], hq: "UK", founded: 2018 },
      { name: "Obligate", url: "https://obligate.com", desc: "On-chain corporate bond issuance platform regulated in Switzerland", tags: ["Bonds","Switzerland","Corporate"], hq: "Switzerland", founded: 2021 },
      { name: "Oasis Pro Markets", url: "https://oasispro.com", desc: "SEC-registered ATS for trading tokenized securities and digital bonds", tags: ["ATS","SEC","Bonds"], hq: "USA", founded: 2020 },
      { name: "Figure Markets", url: "https://figuremarkets.com", desc: "Provenance blockchain-based marketplace for tokenized home equity and securities", tags: ["Provenance","HELOC","Securities"], hq: "USA", founded: 2018 },
      { name: "Tzedakah", url: "https://tzedakah.finance", desc: "Social impact tokenization platform for ESG-compliant real-world assets", tags: ["ESG","Impact","Social"], hq: "Israel", founded: 2022 },
      { name: "Elitium", url: "https://elitium.io", desc: "Tokenized luxury asset platform for art, real estate and collectibles", tags: ["Luxury","Art","Collectibles"], hq: "Netherlands", founded: 2018 },
      { name: "Upvest", url: "https://upvest.co", desc: "Investment API infrastructure enabling brokers to offer tokenized securities", tags: ["API","Brokerage","Infrastructure"], hq: "Germany", founded: 2017 },
      { name: "Tokentus", url: "https://tokentus.com", desc: "Investment company focused on blockchain infrastructure and tokenization ventures", tags: ["Investment","Infrastructure","Fund"], hq: "Germany", founded: 2019 },
      { name: "Aktionariat", url: "https://aktionariat.com", desc: "Swiss platform for tokenizing company equity shares with built-in marketplace", tags: ["Equity","Swiss","SME"], hq: "Switzerland", founded: 2020 },
    ],
  },
  {
    id: "legal",
    name: "Legal & Regulatory Advisory",
    icon: "⚖",
    color: "#7B68EE",
    description: "Specialized law firms and advisory practices for digital asset regulation, securities compliance and cross-border structuring",
    vendors: [
      { name: "DLA Piper", url: "https://dlapiper.com", desc: "Global law firm with dedicated digital assets and blockchain practice across 40+ countries", tags: ["Global","Securities","Cross-Border"], hq: "UK/USA", founded: 1999 },
      { name: "Latham & Watkins", url: "https://lw.com", desc: "Top-tier firm advising on tokenized securities, DeFi regulation and digital asset funds", tags: ["Securities","DeFi","Funds"], hq: "USA", founded: 1934 },
      { name: "Linklaters", url: "https://linklaters.com", desc: "Magic Circle firm with blockchain lab and digital assets practice in EU/UK/APAC", tags: ["Magic Circle","EU","MiCA"], hq: "UK", founded: 1838 },
      { name: "Debevoise & Plimpton", url: "https://debevoise.com", desc: "Leading fintech practice advising institutional clients on digital asset regulation", tags: ["Fintech","Institutional","SEC"], hq: "USA", founded: 1931 },
      { name: "Clifford Chance", url: "https://cliffordchance.com", desc: "Global firm with cross-border digital asset practice and blockchain advisory", tags: ["Global","Cross-Border","Regulatory"], hq: "UK", founded: 1987 },
      { name: "Baker McKenzie", url: "https://bakermckenzie.com", desc: "Multi-jurisdictional blockchain and crypto regulatory advisory services", tags: ["Multi-Jurisdiction","Crypto","Tax"], hq: "USA", founded: 1949 },
      { name: "Morrison Foerster", url: "https://mofo.com", desc: "Tech-focused firm with deep fintech, blockchain and digital asset securities practice", tags: ["Fintech","Securities","IP"], hq: "USA", founded: 1883 },
      { name: "Cooley", url: "https://cooley.com", desc: "Leading firm for crypto startups, token offerings and DAO legal structures", tags: ["Startups","Token Sales","DAO"], hq: "USA", founded: 1920 },
      { name: "Fenwick & West", url: "https://fenwick.com", desc: "Silicon Valley firm specializing in crypto, DeFi and blockchain venture structuring", tags: ["VC","DeFi","Silicon Valley"], hq: "USA", founded: 1972 },
      { name: "Anderson Kill", url: "https://andersonkill.com", desc: "Blockchain and smart contracts practice with cryptocurrency litigation expertise", tags: ["Litigation","Smart Contracts","Insurance"], hq: "USA", founded: 1969 },
      { name: "Willkie Farr", url: "https://willkie.com", desc: "SEC enforcement defense and digital asset regulatory advisory", tags: ["SEC","Enforcement","Advisory"], hq: "USA", founded: 1888 },
      { name: "Paul Weiss", url: "https://paulweiss.com", desc: "Advises top crypto companies on SEC matters, M&A and regulatory compliance", tags: ["M&A","SEC","Compliance"], hq: "USA", founded: 1875 },
      { name: "Davis Polk", url: "https://davispolk.com", desc: "Blue-chip firm advising on crypto ETF structures, stablecoin regulation and bank partnerships", tags: ["ETF","Stablecoin","Banking"], hq: "USA", founded: 1849 },
      { name: "Sullivan & Cromwell", url: "https://sullcrom.com", desc: "Advisor to major crypto exchanges on regulatory matters and M&A transactions", tags: ["Exchanges","M&A","Regulatory"], hq: "USA", founded: 1879 },
      { name: "White & Case", url: "https://whitecase.com", desc: "Global firm with dedicated fintech and digital assets regulatory team", tags: ["Global","Fintech","Regulatory"], hq: "USA", founded: 1901 },
      { name: "Ashurst", url: "https://ashurst.com", desc: "Digital economy practice covering tokenization, CBDCs and blockchain infrastructure", tags: ["CBDC","UK","Digital Economy"], hq: "UK", founded: 1822 },
      { name: "Freshfields", url: "https://freshfields.com", desc: "Magic Circle firm advising on digital asset regulation in EU under MiCA framework", tags: ["MiCA","EU","Regulation"], hq: "UK", founded: 1743 },
      { name: "Hogan Lovells", url: "https://hoganlovells.com", desc: "Global blockchain and digital assets team spanning US, EU and Asia regulatory matters", tags: ["Global","Asia","Digital Assets"], hq: "UK/USA", founded: 2010 },
      { name: "Reed Smith", url: "https://reedsmith.com", desc: "Fintech and blockchain practice with NFT, metaverse and tokenization expertise", tags: ["NFT","Metaverse","Fintech"], hq: "USA", founded: 1877 },
      { name: "Perkins Coie", url: "https://perkinscoie.com", desc: "Pioneer blockchain legal practice since 2013, advising on tokens, exchanges and custody", tags: ["Pioneer","Exchanges","Custody"], hq: "USA", founded: 1912 },
      { name: "Proskauer Rose", url: "https://proskauer.com", desc: "Blockchain practice advising on digital asset funds, staking and DeFi protocols", tags: ["Funds","Staking","DeFi"], hq: "USA", founded: 1875 },
      { name: "K&L Gates", url: "https://klgates.com", desc: "Global firm with fintech, digital assets and payments regulatory teams", tags: ["Payments","Regulatory","Global"], hq: "USA", founded: 1946 },
      { name: "Dentons", url: "https://dentons.com", desc: "World's largest law firm with emerging blockchain and digital asset advisory across 80+ countries", tags: ["Global","Emerging","80+ Countries"], hq: "UK", founded: 2013 },
      { name: "Norton Rose Fulbright", url: "https://nortonrosefulbright.com", desc: "Blockchain and crypto regulatory advisory across the Americas, EMEA and Asia Pacific", tags: ["Americas","EMEA","APAC"], hq: "UK", founded: 2013 },
      { name: "Simmons & Simmons", url: "https://simmons-simmons.com", desc: "Specialist digital assets practice with deep crypto fund and MiCA expertise", tags: ["Funds","MiCA","Specialist"], hq: "UK", founded: 1896 },
      { name: "Mayer Brown", url: "https://mayerbrown.com", desc: "Digital assets and blockchain technology practice for financial institutions", tags: ["Banks","Technology","Institutional"], hq: "USA", founded: 1881 },
      { name: "Sidley Austin", url: "https://sidley.com", desc: "Advising on SEC digital asset regulatory matters and crypto investment structures", tags: ["SEC","Investment","Regulatory"], hq: "USA", founded: 1866 },
      { name: "Greenberg Traurig", url: "https://gtlaw.com", desc: "Global blockchain practice covering NFTs, DeFi, DAOs and token launches", tags: ["NFT","DAO","Token Launch"], hq: "USA", founded: 1967 },
      { name: "Orrick", url: "https://orrick.com", desc: "Tech-focused firm advising crypto companies, DAOs and Web3 protocols on compliance", tags: ["Web3","DAO","Compliance"], hq: "USA", founded: 1863 },
      { name: "Keystone Law", url: "https://keystonelaw.com", desc: "UK-based firm with boutique blockchain, crypto and digital asset advisory", tags: ["Boutique","UK","Crypto"], hq: "UK", founded: 2002 },
      { name: "MME", url: "https://mme.ch", desc: "Swiss Crypto Valley pioneer firm advising on token offerings and blockchain governance", tags: ["Swiss","Crypto Valley","Token"], hq: "Switzerland", founded: 1996 },
      { name: "Pestalozzi", url: "https://pestalozzilaw.com", desc: "Swiss law firm specializing in blockchain, DLT regulation and financial market law", tags: ["Swiss","DLT","Financial Law"], hq: "Switzerland", founded: 1911 },
      { name: "Loyens & Loeff", url: "https://loyensloeff.com", desc: "Benelux firm advising on digital asset structuring and EU crypto regulation", tags: ["Benelux","EU","Structuring"], hq: "Netherlands", founded: 1990 },
      { name: "Eversheds Sutherland", url: "https://eversheds-sutherland.com", desc: "Global firm with fintech and blockchain advisory across 30+ jurisdictions", tags: ["Global","Fintech","30+ Jurisdictions"], hq: "UK", founded: 2017 },
      { name: "Goodwin Procter", url: "https://goodwinlaw.com", desc: "Digital currency and blockchain technology practice for crypto companies and funds", tags: ["Crypto","Funds","Technology"], hq: "USA", founded: 1912 },
      { name: "Blockchain Lawyers Group", url: "https://blockchainlawyers.group", desc: "Boutique advisory network specializing in blockchain legal matters globally", tags: ["Boutique","Network","Global"], hq: "Global", founded: 2018 },
      { name: "Lexology (BCLP)", url: "https://bclplaw.com", desc: "Bryan Cave Leighton Paisner digital assets and DLT advisory practice", tags: ["DLT","Advisory","Global"], hq: "UK/USA", founded: 2018 },
      { name: "Ogier", url: "https://ogier.com", desc: "Offshore law firm advising on digital asset funds in Cayman, BVI and Jersey", tags: ["Offshore","Cayman","Funds"], hq: "Jersey", founded: 1981 },
      { name: "Carey Olsen", url: "https://careyolsen.com", desc: "Leading offshore firm for crypto fund structuring in Cayman and Channel Islands", tags: ["Offshore","Fund Structuring","Cayman"], hq: "Jersey", founded: 1898 },
      { name: "Appleby", url: "https://applebyglobal.com", desc: "Offshore legal services for digital asset companies and crypto fund structures", tags: ["Offshore","Digital Assets","Funds"], hq: "Bermuda", founded: 1898 },
      { name: "WilmerHale", url: "https://wilmerhale.com", desc: "SEC enforcement defense and digital asset regulatory advocacy in Washington DC", tags: ["SEC","Enforcement","DC"], hq: "USA", founded: 2004 },
      { name: "Shearman & Sterling", url: "https://shearman.com", desc: "Global firm advising on blockchain capital markets and digital asset derivatives", tags: ["Capital Markets","Derivatives","Global"], hq: "USA", founded: 1873 },
      { name: "Allen & Overy", url: "https://allenovery.com", desc: "Magic Circle firm with extensive digital assets practice across EU and APAC", tags: ["Magic Circle","EU","APAC"], hq: "UK", founded: 1930 },
      { name: "Herbert Smith Freehills", url: "https://herbertsmithfreehills.com", desc: "Global firm advising on digital asset regulation in Australia, APAC and UK", tags: ["APAC","Australia","UK"], hq: "Australia/UK", founded: 2012 },
      { name: "Osborne Clarke", url: "https://osborneclarke.com", desc: "European tech-focused firm with blockchain, DeFi and MiCA regulatory expertise", tags: ["Europe","Tech","MiCA"], hq: "UK", founded: 1748 },
      { name: "Bird & Bird", url: "https://twobirds.com", desc: "International firm with fintech and blockchain practice across 30+ offices", tags: ["Fintech","International","30+ Offices"], hq: "UK", founded: 1846 },
      { name: "Dechert", url: "https://dechert.com", desc: "Leading fund formation practice extending into tokenized fund structures", tags: ["Fund Formation","Tokenized","Institutional"], hq: "USA", founded: 1875 },
      { name: "Kirkland & Ellis", url: "https://kirkland.com", desc: "Advising on crypto PE/VC deals, fund structuring and digital asset M&A", tags: ["PE/VC","M&A","Fund"], hq: "USA", founded: 1909 },
      { name: "Jones Day", url: "https://jonesday.com", desc: "Global firm with blockchain and cryptocurrency regulatory and enforcement practice", tags: ["Enforcement","Regulatory","Global"], hq: "USA", founded: 1893 },
      { name: "Wachtell Lipton", url: "https://wlrk.com", desc: "Elite M&A firm advising on crypto company acquisitions and governance", tags: ["M&A","Governance","Elite"], hq: "USA", founded: 1965 },
    ],
  },
  {
    id: "kyc",
    name: "KYC, AML & Identity",
    icon: "🛡",
    color: "#FF6B6B",
    description: "Identity verification, anti-money laundering screening, and compliance tools built for Web3 and digital asset platforms",
    vendors: [
      { name: "Chainalysis", url: "https://chainalysis.com", desc: "Leading blockchain analytics and compliance platform used by 70+ countries", tags: ["Analytics","Compliance","Investigations"], hq: "USA", founded: 2014 },
      { name: "Elliptic", url: "https://elliptic.co", desc: "Blockchain analytics for crypto compliance, risk management and investigations", tags: ["Analytics","Risk","Compliance"], hq: "UK", founded: 2013 },
      { name: "Sumsub", url: "https://sumsub.com", desc: "Full-cycle identity verification covering KYC, KYB, AML in 220+ countries", tags: ["KYC","KYB","220+ Countries"], hq: "UK", founded: 2015 },
      { name: "Jumio", url: "https://jumio.com", desc: "AI-powered identity verification with document scanning and biometric liveness", tags: ["AI","Biometric","Document"], hq: "USA", founded: 2010 },
      { name: "Onfido", url: "https://onfido.com", desc: "Document and biometric verification trusted by crypto exchanges worldwide", tags: ["Biometric","Document","Exchanges"], hq: "UK", founded: 2012 },
      { name: "Shufti Pro", url: "https://shuftipro.com", desc: "AI identity verification with 3000+ sanctions lists and PEP screening", tags: ["AI","Sanctions","PEP"], hq: "UK", founded: 2017 },
      { name: "AU10TIX", url: "https://au10tix.com", desc: "98.8% accuracy identity verification with multi-layer deepfake detection", tags: ["Deepfake Detection","High Accuracy","Travel Rule"], hq: "Israel", founded: 2002 },
      { name: "Blockpass", url: "https://blockpass.org", desc: "Reusable KYC identity platform with 1.1M+ verified individuals for Web3", tags: ["Reusable KYC","Web3","1.1M+ Users"], hq: "Hong Kong", founded: 2017 },
      { name: "KYC-Chain", url: "https://kyc-chain.com", desc: "Full-stack compliance platform with crypto wallet screening and AML monitoring", tags: ["Wallet Screening","AML","Full-Stack"], hq: "Hong Kong", founded: 2016 },
      { name: "Zyphe", url: "https://zyphe.com", desc: "Privacy-first decentralized KYC with zero-knowledge architecture across 190+ countries", tags: ["ZK Proof","Privacy","Decentralized"], hq: "UK", founded: 2023 },
      { name: "Fractal ID", url: "https://fractal.id", desc: "Decentralized identity verification for Web3 without centralized data storage", tags: ["Decentralized","Web3","Privacy"], hq: "Germany", founded: 2018 },
      { name: "Civic", url: "https://civic.com", desc: "Decentralized identity verification with on-chain credential passes", tags: ["On-Chain","Credentials","Passes"], hq: "USA", founded: 2015 },
      { name: "Persona", url: "https://withpersona.com", desc: "Identity infrastructure platform with automated KYC and fraud prevention", tags: ["Infrastructure","Fraud Prevention","API"], hq: "USA", founded: 2018 },
      { name: "Sardine", url: "https://sardine.ai", desc: "Fraud prevention and compliance platform for crypto with device intelligence", tags: ["Fraud","Device Intelligence","Compliance"], hq: "USA", founded: 2020 },
      { name: "Notabene", url: "https://notabene.id", desc: "FATF Travel Rule compliance platform for VASP-to-VASP data sharing", tags: ["Travel Rule","FATF","VASP"], hq: "USA", founded: 2020 },
      { name: "Coinfirm", url: "https://coinfirm.com", desc: "AML and blockchain analytics platform with compliance risk assessment", tags: ["AML","Analytics","Risk"], hq: "Poland", founded: 2016 },
      { name: "Crystal Blockchain", url: "https://crystalblockchain.com", desc: "Bitfury-backed blockchain analytics for AML compliance and investigation", tags: ["Bitfury","AML","Investigation"], hq: "Netherlands", founded: 2018 },
      { name: "TRM Labs", url: "https://trmlabs.com", desc: "Blockchain intelligence platform for detecting crypto fraud and financial crime", tags: ["Intelligence","Fraud","Financial Crime"], hq: "USA", founded: 2018 },
      { name: "Merkle Science", url: "https://merklescience.com", desc: "Predictive crypto risk and intelligence platform for compliance teams", tags: ["Predictive","Risk","Intelligence"], hq: "Singapore", founded: 2018 },
      { name: "Solidus Labs", url: "https://soliduslabs.com", desc: "Crypto-native market surveillance and risk monitoring for exchanges", tags: ["Market Surveillance","Risk","Exchanges"], hq: "USA", founded: 2018 },
      { name: "Scorechain", url: "https://scorechain.com", desc: "Blockchain analytics and crypto AML compliance for financial institutions", tags: ["Analytics","AML","Banks"], hq: "Luxembourg", founded: 2015 },
      { name: "Comply Advantage", url: "https://complyadvantage.com", desc: "AI-driven financial crime detection with real-time AML screening", tags: ["AI","Financial Crime","Real-Time"], hq: "UK", founded: 2014 },
      { name: "Veriff", url: "https://veriff.com", desc: "AI-powered identity verification serving crypto platforms with video verification", tags: ["AI","Video","Identity"], hq: "Estonia", founded: 2015 },
      { name: "Trulioo", url: "https://trulioo.com", desc: "Global identity verification network covering 5B+ people and 330M+ companies", tags: ["Global","5B+ People","KYB"], hq: "Canada", founded: 2011 },
      { name: "Refinitiv (LSEG)", url: "https://refinitiv.com", desc: "World-Check risk intelligence and screening for digital asset compliance", tags: ["World-Check","Risk","LSEG"], hq: "UK", founded: 2018 },
      { name: "Dow Jones Risk", url: "https://dowjones.com/risk", desc: "Risk and compliance data for PEP screening and sanctions monitoring", tags: ["PEP","Sanctions","Data"], hq: "USA", founded: 1882 },
      { name: "LexisNexis Risk", url: "https://risk.lexisnexis.com", desc: "KYC and due diligence platform with billions of public and proprietary records", tags: ["Due Diligence","Data","Records"], hq: "USA", founded: 1970 },
      { name: "Moody's (Bureau van Dijk)", url: "https://moodys.com", desc: "End-to-end KYC/AML tools with entity data and risk screening for compliance", tags: ["Entity Data","Risk","Moody's"], hq: "USA", founded: 1909 },
      { name: "Socure", url: "https://socure.com", desc: "AI-powered digital identity verification and fraud prevention platform", tags: ["AI","Fraud Prevention","Digital ID"], hq: "USA", founded: 2012 },
      { name: "Alloy", url: "https://alloy.com", desc: "Identity decisioning platform with eID verification and fraud detection", tags: ["Decisioning","eID","Fraud"], hq: "USA", founded: 2015 },
      { name: "Ondato", url: "https://ondato.com", desc: "KYC, AML and KYB compliance platform for regulated businesses in EU", tags: ["EU","KYB","Compliance"], hq: "Lithuania", founded: 2018 },
      { name: "Regula", url: "https://regulaforensics.com", desc: "Document verification and biometric solutions for identity authentication", tags: ["Document","Biometric","Forensic"], hq: "USA", founded: 2006 },
      { name: "Sift", url: "https://sift.com", desc: "Digital trust and safety platform with fraud prevention for crypto", tags: ["Trust","Safety","Fraud"], hq: "USA", founded: 2011 },
      { name: "Advance.AI (AdvanGuard)", url: "https://advance.ai", desc: "Unified KYC platform for crypto with deepfake detection and 99% accuracy", tags: ["Deepfake","99% Accuracy","Crypto"], hq: "Singapore", founded: 2016 },
      { name: "WebID", url: "https://webid-solutions.com", desc: "Video and automated ID verification for Web3 and MiCA-compliant platforms", tags: ["Video ID","MiCA","Automated"], hq: "Germany", founded: 2012 },
      { name: "Microblink", url: "https://microblink.com", desc: "BlinkID verifies 2500+ document types from 170+ countries at 5x speed", tags: ["Fast","2500+ Docs","170+ Countries"], hq: "UK", founded: 2013 },
      { name: "iComply", url: "https://icomplyis.com", desc: "Modular compliance platform for digital asset KYC, AML and jurisdiction management", tags: ["Modular","Jurisdiction","Digital Assets"], hq: "Canada", founded: 2017 },
      { name: "Incode", url: "https://incode.com", desc: "Gartner MQ Leader for identity verification with in-house AI fraud detection", tags: ["Gartner Leader","AI","Enterprise"], hq: "USA", founded: 2015 },
      { name: "Synaps", url: "https://synaps.io", desc: "Web3-native identity verification with on-chain KYC and wallet-bound credentials", tags: ["Web3","On-Chain","Wallet-Bound"], hq: "France", founded: 2021 },
      { name: "Parallel Markets", url: "https://parallelmarkets.com", desc: "Accredited investor verification and KYC for private capital and tokenized securities", tags: ["Accredited Investor","Private Capital","Securities"], hq: "USA", founded: 2018 },
      { name: "Passbase", url: "https://passbase.com", desc: "Developer-first identity verification API with face verification and liveness", tags: ["Developer","API","Face Verification"], hq: "Germany", founded: 2018 },
      { name: "Spruce ID", url: "https://spruceid.com", desc: "Open-source decentralized identity solutions with Sign-In with Ethereum", tags: ["Open Source","SIWE","Decentralized"], hq: "USA", founded: 2020 },
      { name: "Worldcoin / World ID", url: "https://worldcoin.org", desc: "Biometric proof of personhood using iris scanning for on-chain identity", tags: ["Biometric","Iris","Proof of Personhood"], hq: "USA", founded: 2019 },
      { name: "zkMe", url: "https://zk.me", desc: "Zero-knowledge identity oracle for privacy-preserving compliance verification", tags: ["ZK Oracle","Privacy","Compliance"], hq: "Singapore", founded: 2022 },
      { name: "Holonym", url: "https://holonym.id", desc: "Zero-knowledge identity proofs for Web3 compliance without revealing personal data", tags: ["ZK Proofs","Privacy","Web3"], hq: "USA", founded: 2022 },
      { name: "Quadrata", url: "https://quadrata.com", desc: "On-chain passport network providing compliance-grade identity attestations", tags: ["Passport","On-Chain","Attestation"], hq: "USA", founded: 2021 },
      { name: "Polygon ID", url: "https://polygonid.com", desc: "Self-sovereign identity framework by Polygon using zero-knowledge proofs", tags: ["SSI","Polygon","ZK"], hq: "Global", founded: 2022 },
      { name: "Dock.io", url: "https://dock.io", desc: "Verifiable credentials and decentralized identity platform for enterprises", tags: ["Verifiable Credentials","Enterprise","DID"], hq: "USA", founded: 2017 },
      { name: "Litentry", url: "https://litentry.com", desc: "Cross-chain decentralized identity aggregation protocol for Web3", tags: ["Cross-Chain","Identity","Aggregation"], hq: "Germany", founded: 2019 },
      { name: "Anima (Synaps)", url: "https://anima.io", desc: "Privacy-preserving digital identity for Web3 with soulbound credentials", tags: ["Soulbound","Privacy","Credentials"], hq: "France", founded: 2022 },
    ],
  },
  {
    id: "custody",
    name: "Custody & Wallets",
    icon: "🔒",
    color: "#FFD93D",
    description: "Institutional-grade storage, key management, and wallet infrastructure for securing digital assets",
    vendors: [
      { name: "Fireblocks", url: "https://fireblocks.com", desc: "MPC-based custody and transfer network for 120+ blockchains, thousands of assets", tags: ["MPC","Transfer Network","120+ Chains"], hq: "USA", founded: 2018 },
      { name: "Coinbase Custody", url: "https://custody.coinbase.com", desc: "NYDFS-chartered qualified custodian with SOC 1/2 audits and insurance", tags: ["NYDFS","Qualified Custodian","SOC 2"], hq: "USA", founded: 2018 },
      { name: "BitGo", url: "https://bitgo.com", desc: "OCC-chartered custody with $90B+ under custody, NYSE IPO filing in 2026", tags: ["OCC Charter","$90B AUC","Multi-Sig"], hq: "USA", founded: 2013 },
      { name: "Anchorage Digital", url: "https://anchorage.com", desc: "First federally chartered crypto bank with OCC charter and staking services", tags: ["Federal Charter","OCC","Staking"], hq: "USA", founded: 2017 },
      { name: "Fidelity Digital Assets", url: "https://fidelitydigitalassets.com", desc: "Trust company custody with $100M+ insurance, backed by $4T+ parent", tags: ["Trust Company","$4T Parent","Insurance"], hq: "USA", founded: 2018 },
      { name: "BNY Digital Assets", url: "https://bny.com", desc: "First G-SIB to offer digital asset custody, bridging TradFi and crypto", tags: ["G-SIB","TradFi","Institutional"], hq: "USA", founded: 1784 },
      { name: "Copper.co", url: "https://copper.co", desc: "ClearLoop off-exchange settlement network with award-winning cold storage", tags: ["ClearLoop","Settlement","Cold Storage"], hq: "Switzerland", founded: 2018 },
      { name: "Zodia Custody", url: "https://zodia.io", desc: "Standard Chartered-backed institutional custody for digital assets", tags: ["StanChart","Institutional","Insurance"], hq: "UK", founded: 2020 },
      { name: "Sygnum Bank", url: "https://sygnum.com", desc: "FINMA-licensed Swiss digital asset bank with off-balance-sheet custody", tags: ["FINMA","Swiss Bank","Off-Balance Sheet"], hq: "Switzerland", founded: 2018 },
      { name: "SEBA Bank", url: "https://seba.swiss", desc: "FINMA-regulated Swiss bank with integrated crypto custody and trading", tags: ["FINMA","Swiss","Integrated"], hq: "Switzerland", founded: 2018 },
      { name: "Komainu", url: "https://komainu.com", desc: "Nomura/Ledger/CoinShares JV institutional custody with $75M Blockstream raise", tags: ["Nomura","Ledger","JV"], hq: "Jersey", founded: 2018 },
      { name: "Hex Trust", url: "https://hextrust.com", desc: "Licensed digital asset custodian in Hong Kong, Singapore and Dubai", tags: ["Hong Kong","Licensed","APAC"], hq: "Hong Kong", founded: 2018 },
      { name: "Cobo", url: "https://cobo.com", desc: "Zero-incident custodian with Lightning, L2 support and ISO 27001 certification", tags: ["Zero-Incident","Lightning","ISO 27001"], hq: "Singapore", founded: 2017 },
      { name: "NYDIG", url: "https://nydig.com", desc: "Bitcoin-focused custody backed by Stone Ridge, sub-custodian for US Bank", tags: ["Bitcoin","Stone Ridge","US Bank"], hq: "USA", founded: 2017 },
      { name: "Ledger Enterprise", url: "https://ledger.com/enterprise", desc: "Hardware security module-based custody for institutions with governance tools", tags: ["HSM","Hardware","Governance"], hq: "France", founded: 2014 },
      { name: "Metaco (Ripple)", url: "https://metaco.com", desc: "Bank-grade digital asset orchestration platform acquired by Ripple", tags: ["Ripple","Bank-Grade","Orchestration"], hq: "Switzerland", founded: 2015 },
      { name: "Ripple Custody", url: "https://ripple.com", desc: "Enterprise custody platform with HSM integration and multi-chain support", tags: ["Enterprise","HSM","Multi-Chain"], hq: "USA", founded: 2012 },
      { name: "Safeheron", url: "https://safeheron.com", desc: "Open-source MPC custody platform with TEE-secured key management", tags: ["Open Source","MPC","TEE"], hq: "Singapore", founded: 2022 },
      { name: "Liminal", url: "https://lmnl.app", desc: "Multi-chain digital asset custody and wallet infrastructure with policy engine", tags: ["Multi-Chain","Policy Engine","API"], hq: "India", founded: 2021 },
      { name: "Fordefi", url: "https://fordefi.com", desc: "MPC wallet platform with built-in transaction simulation and policy engine", tags: ["MPC","Simulation","Policy"], hq: "Israel", founded: 2021 },
      { name: "Qredo", url: "https://qredo.com", desc: "Decentralized MPC custody network with cross-chain settlement", tags: ["Decentralized MPC","Cross-Chain","Network"], hq: "UK", founded: 2018 },
      { name: "Propine", url: "https://propine.com", desc: "MAS-licensed digital asset custodian for institutional investors in APAC", tags: ["MAS","APAC","Institutional"], hq: "Singapore", founded: 2018 },
      { name: "Aegis Custody", url: "https://aegiscustody.com", desc: "US-regulated custodian combining hot, warm and cold storage tiers", tags: ["US Regulated","Multi-Tier","Enterprise"], hq: "USA", founded: 2018 },
      { name: "Custonomy", url: "https://custonomy.io", desc: "MPC wallet-as-a-service for enterprises with white-label custody", tags: ["WaaS","White-Label","MPC"], hq: "Hong Kong", founded: 2020 },
      { name: "GK8 (Galaxy)", url: "https://gk8.io", desc: "Air-gapped cold vault custody platform acquired by Galaxy Digital", tags: ["Air-Gapped","Cold Vault","Galaxy"], hq: "Israel", founded: 2018 },
      { name: "Taurus", url: "https://taurushq.com", desc: "Swiss digital asset infrastructure for banks covering custody, tokenization and trading", tags: ["Swiss","Banks","Full-Stack"], hq: "Switzerland", founded: 2018 },
      { name: "Finoa", url: "https://finoa.io", desc: "BaFin-regulated digital asset custody for European institutional investors", tags: ["BaFin","European","Institutional"], hq: "Germany", founded: 2018 },
      { name: "Tangany", url: "https://tangany.com", desc: "German BaFin-licensed white-label custody API for digital assets", tags: ["BaFin","White-Label","API"], hq: "Germany", founded: 2019 },
      { name: "Dfns", url: "https://dfns.co", desc: "Programmable key management API with MPC and passkey support for wallets", tags: ["API","MPC","Passkeys"], hq: "France", founded: 2020 },
      { name: "Cubist", url: "https://cubist.dev", desc: "Hardware-security-backed key management for Web3 with policy automation", tags: ["Hardware Security","Policy","Web3"], hq: "USA", founded: 2022 },
      { name: "Trustology (Bitpanda)", url: "https://bitpanda.com", desc: "FCA-registered custody provider acquired by Bitpanda for institutional services", tags: ["FCA","Bitpanda","Institutional"], hq: "UK", founded: 2017 },
      { name: "Standard Custody", url: "https://standardcustody.com", desc: "Regulated qualified custodian focused on digital assets and tokenized securities", tags: ["Qualified Custodian","Regulated","Securities"], hq: "USA", founded: 2020 },
      { name: "Gnosis Safe (Safe)", url: "https://safe.global", desc: "Smart contract-based multi-sig wallet securing $100B+ in digital assets", tags: ["Multi-Sig","Smart Contract","$100B+"], hq: "Germany", founded: 2018 },
      { name: "Coincover", url: "https://coincover.com", desc: "Crypto asset protection with key recovery, insurance and transaction monitoring", tags: ["Recovery","Insurance","Protection"], hq: "UK", founded: 2018 },
      { name: "Casa", url: "https://casa.io", desc: "Multi-key self-custody solution for Bitcoin and Ethereum with inheritance planning", tags: ["Self-Custody","Multi-Key","Inheritance"], hq: "USA", founded: 2016 },
      { name: "Unchained", url: "https://unchained.com", desc: "Collaborative multi-sig Bitcoin custody for individuals and institutions", tags: ["Multi-Sig","Bitcoin","Collaborative"], hq: "USA", founded: 2016 },
      { name: "Trezor", url: "https://trezor.io", desc: "Pioneer hardware wallet with open-source security model for self-custody", tags: ["Hardware","Open Source","Self-Custody"], hq: "Czech Republic", founded: 2013 },
      { name: "Ledger", url: "https://ledger.com", desc: "Market-leading hardware wallet protecting 20% of global crypto assets", tags: ["Hardware","20% Global","Consumer"], hq: "France", founded: 2014 },
      { name: "Blockdaemon", url: "https://blockdaemon.com", desc: "Institutional staking and node infrastructure with integrated custody APIs", tags: ["Staking","Nodes","Infrastructure"], hq: "USA", founded: 2017 },
      { name: "Figment", url: "https://figment.io", desc: "Institutional staking provider with validator operations and custody integration", tags: ["Staking","Validators","Institutional"], hq: "Canada", founded: 2018 },
      { name: "Gemini Custody", url: "https://gemini.com/custody", desc: "NYDFS-regulated custody with SOC 2 Type 2 audit and insurance coverage", tags: ["NYDFS","SOC 2","Insurance"], hq: "USA", founded: 2015 },
      { name: "Bakkt", url: "https://bakkt.com", desc: "ICE-backed digital asset platform with custody, trading and loyalty solutions", tags: ["ICE","Trading","Loyalty"], hq: "USA", founded: 2018 },
      { name: "Kingdom Trust", url: "https://kingdomtrust.com", desc: "Qualified custodian offering crypto IRA and digital asset custody services", tags: ["IRA","Qualified Custodian","Retirement"], hq: "USA", founded: 2009 },
      { name: "Prime Trust (BitGo)", url: "https://primetrust.com", desc: "Financial infrastructure for digital assets acquired by BitGo", tags: ["Infrastructure","BitGo","APIs"], hq: "USA", founded: 2016 },
      { name: "Curv (PayPal)", url: "https://curv.co", desc: "MPC wallet technology acquired by PayPal for institutional crypto custody", tags: ["PayPal","MPC","Acquired"], hq: "Israel", founded: 2018 },
      { name: "Palisade (Ripple)", url: "https://palisade.com", desc: "Wallet infrastructure and transaction signing acquired by Ripple", tags: ["Ripple","Wallet","Transaction Signing"], hq: "USA", founded: 2020 },
      { name: "Lunu", url: "https://lunu.io", desc: "Crypto payment and custody infrastructure for merchants and institutions", tags: ["Payments","Merchants","Infrastructure"], hq: "Switzerland", founded: 2018 },
      { name: "Warden Protocol", url: "https://wardenprotocol.org", desc: "Modular security protocol for intent-based key management across chains", tags: ["Modular","Intent-Based","Cross-Chain"], hq: "Global", founded: 2023 },
      { name: "Entropy", url: "https://entropy.xyz", desc: "Decentralized signing protocol using threshold cryptography for key management", tags: ["Threshold","Decentralized","Signing"], hq: "USA", founded: 2022 },
      { name: "Capsule", url: "https://usecapsule.com", desc: "Embedded wallet SDK with MPC key management for seamless user onboarding", tags: ["SDK","Embedded","Onboarding"], hq: "USA", founded: 2022 },
    ],
  },
  {
    id: "payments",
    name: "Payment Rails & On-Ramps",
    icon: "⚡",
    color: "#00BFFF",
    description: "Fiat-to-crypto on/off ramps, stablecoin infrastructure, and cross-border payment rails for digital asset ecosystems",
    vendors: [
      { name: "Circle (USDC)", url: "https://circle.com", desc: "USDC stablecoin issuer with cross-chain transfer protocol and payments APIs", tags: ["USDC","Stablecoin","CCTP"], hq: "USA", founded: 2013 },
      { name: "MoonPay", url: "https://moonpay.com", desc: "Leading crypto on-ramp processing $6B+ transactions, embedded in 100+ wallets", tags: ["On-Ramp","$6B+","Embedded"], hq: "USA", founded: 2019 },
      { name: "Ramp Network", url: "https://ramp.network", desc: "SDK-first fiat on/off-ramp with global coverage and instant settlement", tags: ["SDK","Instant","Global"], hq: "UK", founded: 2017 },
      { name: "Transak", url: "https://transak.com", desc: "Non-custodial on/off-ramp aggregator supporting 160+ countries and 170+ cryptos", tags: ["Aggregator","160+ Countries","Non-Custodial"], hq: "USA", founded: 2019 },
      { name: "Wyre", url: "https://sendwyre.com", desc: "Compliance-first crypto payment API for exchanges and wallets", tags: ["API","Compliance","Exchanges"], hq: "USA", founded: 2013 },
      { name: "Sardine", url: "https://sardine.ai", desc: "Fraud prevention + instant fiat-to-crypto settlement with 0% chargeback guarantee", tags: ["Fraud Prevention","Instant","0% Chargeback"], hq: "USA", founded: 2020 },
      { name: "Stripe Crypto", url: "https://stripe.com/crypto", desc: "Stripe's crypto on-ramp and USDC payouts for global internet businesses", tags: ["Stripe","On-Ramp","USDC Payouts"], hq: "USA", founded: 2010 },
      { name: "PayPal Crypto", url: "https://paypal.com", desc: "PYUSD stablecoin with crypto buy/sell/transfer for 400M+ users", tags: ["PYUSD","400M Users","Consumer"], hq: "USA", founded: 1998 },
      { name: "Coinbase Pay", url: "https://coinbase.com", desc: "Embedded on-ramp widget for dApps with Coinbase account integration", tags: ["Embedded","dApps","Widget"], hq: "USA", founded: 2012 },
      { name: "Binance Pay", url: "https://pay.binance.com", desc: "Crypto payment solution with merchant integration and QR code payments", tags: ["Merchant","QR Code","Global"], hq: "Global", founded: 2020 },
      { name: "Ripple Payments", url: "https://ripple.com", desc: "Enterprise cross-border payment network using XRP for real-time settlement", tags: ["Cross-Border","XRP","Real-Time"], hq: "USA", founded: 2012 },
      { name: "Stellar (SDF)", url: "https://stellar.org", desc: "Open-source payment network for cross-border transfers and asset tokenization", tags: ["Open Source","Cross-Border","Network"], hq: "USA", founded: 2014 },
      { name: "Fireblocks Payments", url: "https://fireblocks.com", desc: "Payment operations platform for stablecoin transfers and treasury management", tags: ["Treasury","Stablecoin","Operations"], hq: "USA", founded: 2018 },
      { name: "Paxos", url: "https://paxos.com", desc: "Regulated infrastructure for stablecoin issuance (USDP, PYUSD) and crypto brokerage", tags: ["USDP","PYUSD","Regulated"], hq: "USA", founded: 2012 },
      { name: "Tether", url: "https://tether.to", desc: "Largest stablecoin issuer (USDT) with $100B+ market cap and global reach", tags: ["USDT","$100B+","Dominant"], hq: "BVI", founded: 2014 },
      { name: "Alchemy Pay", url: "https://alchemypay.org", desc: "Hybrid crypto-fiat payment gateway supporting 300+ payment channels in 173 countries", tags: ["Hybrid","300+ Channels","173 Countries"], hq: "Singapore", founded: 2018 },
      { name: "BitPay", url: "https://bitpay.com", desc: "Pioneer crypto payment processor supporting Bitcoin, stablecoins and 100+ cryptos", tags: ["Pioneer","Bitcoin","Merchant"], hq: "USA", founded: 2011 },
      { name: "Banxa", url: "https://banxa.com", desc: "Publicly traded on/off-ramp with multi-currency support and compliance infrastructure", tags: ["Public","Multi-Currency","Compliance"], hq: "Australia", founded: 2014 },
      { name: "Mercuryo", url: "https://mercuryo.io", desc: "Crypto payment infrastructure with instant buy/sell and business payment solutions", tags: ["Instant","Business","Infrastructure"], hq: "UK", founded: 2018 },
      { name: "Simplex (Nuvei)", url: "https://simplex.com", desc: "Fraud-free crypto purchases via credit card, acquired by Nuvei for payment processing", tags: ["Credit Card","Fraud-Free","Nuvei"], hq: "Israel", founded: 2014 },
      { name: "Wert", url: "https://wert.io", desc: "NFT and crypto checkout widget with card-to-crypto in a single transaction", tags: ["NFT","Widget","Card-to-Crypto"], hq: "Estonia", founded: 2018 },
      { name: "Onramper", url: "https://onramper.com", desc: "On-ramp aggregator combining MoonPay, Transak, Wyre and more into single widget", tags: ["Aggregator","Widget","Multi-Provider"], hq: "Netherlands", founded: 2020 },
      { name: "Utorg", url: "https://utorg.pro", desc: "White-label crypto on-ramp with instant card payments in 185+ countries", tags: ["White-Label","185+ Countries","Instant"], hq: "Lithuania", founded: 2020 },
      { name: "Unlimit Crypto", url: "https://unlimit.com", desc: "Global payment infrastructure with crypto on/off-ramp and merchant solutions", tags: ["Global","Merchant","Infrastructure"], hq: "UK", founded: 2009 },
      { name: "Checkout.com Crypto", url: "https://checkout.com", desc: "Enterprise payment processor with crypto settlement and stablecoin support", tags: ["Enterprise","Settlement","Stablecoin"], hq: "UK", founded: 2012 },
      { name: "Zero Hash", url: "https://zerohash.com", desc: "B2B crypto infrastructure for embedding crypto into fintech and banking products", tags: ["B2B","Embedding","Banking"], hq: "USA", founded: 2017 },
      { name: "Fortress (Ripple)", url: "https://fortress.io", desc: "Crypto payment APIs for fiat-to-crypto conversion, acquired by Ripple", tags: ["API","Ripple","Conversion"], hq: "USA", founded: 2020 },
      { name: "Copper Pay", url: "https://copper.co", desc: "Institutional payment rails for digital asset settlement and treasury management", tags: ["Institutional","Settlement","Treasury"], hq: "Switzerland", founded: 2018 },
      { name: "Celo", url: "https://celo.org", desc: "Mobile-first blockchain for decentralized payments and stablecoin distribution", tags: ["Mobile","Stablecoin","Payments"], hq: "USA", founded: 2017 },
      { name: "Request Network", url: "https://request.network", desc: "Decentralized payment request protocol for crypto invoicing and accounting", tags: ["Invoicing","Decentralized","Accounting"], hq: "France", founded: 2017 },
      { name: "Superfluid", url: "https://superfluid.finance", desc: "Streaming payment protocol for real-time salary and subscription payments in crypto", tags: ["Streaming","Salary","Subscriptions"], hq: "Germany", founded: 2020 },
      { name: "Sila", url: "https://silamoney.com", desc: "Banking-as-a-service API connecting traditional banking rails to digital assets", tags: ["BaaS","Banking","API"], hq: "USA", founded: 2018 },
      { name: "Bridge (Stripe)", url: "https://bridge.xyz", desc: "Stablecoin payment API acquired by Stripe for $1B+ enabling global payouts", tags: ["Stripe","$1B Acquisition","Stablecoin API"], hq: "USA", founded: 2022 },
      { name: "BVNK", url: "https://bvnk.com", desc: "End-to-end payment infrastructure for businesses accepting and settling in crypto", tags: ["Business","Settlement","Multi-Rail"], hq: "UK", founded: 2021 },
      { name: "Rain", url: "https://rain.co", desc: "Crypto on/off-ramp licensed across Middle East, Turkey, Pakistan and Africa", tags: ["MENA","Turkey","Africa"], hq: "Bahrain", founded: 2021 },
      { name: "Fonbnk", url: "https://fonbnk.com", desc: "Mobile airtime-to-crypto on-ramp for unbanked users in emerging markets", tags: ["Airtime","Unbanked","Emerging Markets"], hq: "USA", founded: 2021 },
      { name: "Kotani Pay", url: "https://kotanipay.com", desc: "Blockchain-based payment rails for Africa enabling mobile money to crypto", tags: ["Africa","Mobile Money","Crypto"], hq: "Kenya", founded: 2020 },
      { name: "Yellow Card", url: "https://yellowcard.io", desc: "Africa's largest crypto on/off-ramp operating in 20+ African countries", tags: ["Africa","20+ Countries","On/Off-Ramp"], hq: "Nigeria", founded: 2019 },
      { name: "Ramp (DeFi)", url: "https://ramp.network", desc: "Fiat on-ramp integrated into 400+ DeFi protocols and Web3 applications", tags: ["400+ DeFi","Web3","Integrated"], hq: "UK", founded: 2017 },
      { name: "Mt Pelerin", url: "https://mtpelerin.com", desc: "Swiss-regulated crypto/fiat gateway with white-label on-ramp solutions", tags: ["Swiss","White-Label","Regulated"], hq: "Switzerland", founded: 2018 },
      { name: "Paystand", url: "https://paystand.com", desc: "Blockchain-enabled B2B payment platform for zero-fee commercial transactions", tags: ["B2B","Zero-Fee","Commercial"], hq: "USA", founded: 2013 },
      { name: "Bitso", url: "https://bitso.com", desc: "LatAm's leading crypto exchange with cross-border payment infrastructure", tags: ["LatAm","Exchange","Cross-Border"], hq: "Mexico", founded: 2014 },
      { name: "dLocal", url: "https://dlocal.com", desc: "Cross-border payment platform connecting global merchants to emerging markets", tags: ["Cross-Border","Emerging Markets","Merchant"], hq: "Uruguay", founded: 2016 },
      { name: "Chipper Cash", url: "https://chippercash.com", desc: "African mobile payment platform with crypto integration for cross-border transfers", tags: ["Africa","Mobile","Cross-Border"], hq: "USA", founded: 2018 },
      { name: "Mesh (formerly Front)", url: "https://meshconnect.com", desc: "Crypto transfer and payment API aggregating 300+ exchanges and wallets", tags: ["Aggregator","300+ Exchanges","API"], hq: "USA", founded: 2020 },
      { name: "Cybrid", url: "https://cybrid.xyz", desc: "Embedded crypto banking platform for fintechs to offer crypto services", tags: ["Embedded","Banking","Fintechs"], hq: "Canada", founded: 2021 },
      { name: "Conduit", url: "https://conduit.financial", desc: "Stablecoin-powered payroll and payment solution for global workforce", tags: ["Payroll","Stablecoin","Global Workforce"], hq: "USA", founded: 2022 },
      { name: "LayerSwap", url: "https://layerswap.io", desc: "Bridge between exchanges and L2 networks for instant, low-cost transfers", tags: ["Bridge","L2","Low-Cost"], hq: "Global", founded: 2021 },
      { name: "Meso", url: "https://meso.network", desc: "Instant fiat-to-crypto API with bank-level compliance and sub-second settlement", tags: ["Instant","Bank-Level","Sub-Second"], hq: "USA", founded: 2022 },
      { name: "Kado", url: "https://kado.money", desc: "On/off-ramp for DeFi and Web3 with ACH, wire, and card payment support", tags: ["DeFi","ACH","Wire"], hq: "USA", founded: 2021 },
    ],
  },
  {
    id: "smartcontract",
    name: "Smart Contract & Tech Dev",
    icon: "⟐",
    color: "#FF8C42",
    description: "Full-cycle blockchain engineering, smart contract development, security auditing, and Web3 application building",
    vendors: [
      { name: "ConsenSys", url: "https://consensys.io", desc: "Ethereum ecosystem leader building MetaMask, Infura, and enterprise blockchain solutions", tags: ["Ethereum","MetaMask","Infura"], hq: "USA", founded: 2014 },
      { name: "OpenZeppelin", url: "https://openzeppelin.com", desc: "Industry-standard smart contract library and security audit firm for Web3", tags: ["Libraries","Audits","Standards"], hq: "Argentina", founded: 2015 },
      { name: "Trail of Bits", url: "https://trailofbits.com", desc: "Elite security research firm specializing in smart contract and protocol audits", tags: ["Security","Research","Audits"], hq: "USA", founded: 2012 },
      { name: "Certik", url: "https://certik.com", desc: "Leading blockchain security firm with 4600+ audits and on-chain monitoring", tags: ["4600+ Audits","Monitoring","AI"], hq: "USA", founded: 2018 },
      { name: "Halborn", url: "https://halborn.com", desc: "Elite blockchain security firm offering audits, pen testing and DevOps", tags: ["Pen Testing","DevOps","Elite"], hq: "USA", founded: 2019 },
      { name: "Quantstamp", url: "https://quantstamp.com", desc: "Blockchain security company that has secured $200B+ in digital asset risk", tags: ["$200B+ Secured","Audits","Risk"], hq: "USA", founded: 2017 },
      { name: "Chainlink Labs", url: "https://chain.link", desc: "Decentralized oracle network enabling smart contracts to access real-world data", tags: ["Oracles","Data Feeds","CCIP"], hq: "USA", founded: 2017 },
      { name: "Alchemy", url: "https://alchemy.com", desc: "Web3 development platform with APIs, SDKs and tools for building dApps", tags: ["APIs","SDKs","Developer Platform"], hq: "USA", founded: 2017 },
      { name: "Infura (ConsenSys)", url: "https://infura.io", desc: "Leading Ethereum and IPFS infrastructure provider with 400K+ developers", tags: ["Infrastructure","400K+ Devs","IPFS"], hq: "USA", founded: 2016 },
      { name: "QuickNode", url: "https://quicknode.com", desc: "Multi-chain node infrastructure with APIs for 25+ blockchains", tags: ["Nodes","25+ Chains","APIs"], hq: "USA", founded: 2017 },
      { name: "Tenderly", url: "https://tenderly.co", desc: "Smart contract development platform with simulation, debugging and monitoring", tags: ["Simulation","Debugging","Monitoring"], hq: "Serbia", founded: 2018 },
      { name: "Foundry (Paradigm)", url: "https://getfoundry.sh", desc: "Blazing-fast Solidity development framework by Paradigm for EVM chains", tags: ["Solidity","Framework","EVM"], hq: "USA", founded: 2021 },
      { name: "Hardhat (Nomic)", url: "https://hardhat.org", desc: "Leading Ethereum development environment for compiling, testing and deploying", tags: ["Ethereum","Testing","Development"], hq: "Argentina", founded: 2019 },
      { name: "Thirdweb", url: "https://thirdweb.com", desc: "Full-stack Web3 development platform with SDKs, smart contracts and infrastructure", tags: ["Full-Stack","SDKs","Contracts"], hq: "USA", founded: 2021 },
      { name: "Moralis", url: "https://moralis.io", desc: "Web3 data infrastructure with APIs for wallet, NFT, token and DeFi data", tags: ["Data APIs","Wallet","NFT"], hq: "Sweden", founded: 2020 },
      { name: "The Graph", url: "https://thegraph.com", desc: "Decentralized indexing protocol for querying blockchain data with subgraphs", tags: ["Indexing","Subgraphs","Decentralized"], hq: "USA", founded: 2018 },
      { name: "Immunefi", url: "https://immunefi.com", desc: "Web3 bug bounty platform protecting $190B+ with 90K+ security researchers", tags: ["Bug Bounty","$190B+","90K+ Researchers"], hq: "Singapore", founded: 2020 },
      { name: "Spearbit", url: "https://spearbit.com", desc: "Elite smart contract security review collective with top auditors", tags: ["Elite","Collective","Reviews"], hq: "USA", founded: 2021 },
      { name: "Cyfrin", url: "https://cyfrin.io", desc: "Smart contract auditing and security education platform by Patrick Collins", tags: ["Auditing","Education","Solidity"], hq: "USA", founded: 2022 },
      { name: "Code4rena", url: "https://code4rena.com", desc: "Competitive smart contract auditing platform with crowdsourced security reviews", tags: ["Competitive","Crowdsourced","Audits"], hq: "USA", founded: 2021 },
      { name: "Sherlock", url: "https://sherlock.xyz", desc: "Smart contract coverage protocol combining audits with exploit insurance", tags: ["Insurance","Audits","Coverage"], hq: "USA", founded: 2021 },
      { name: "Zellic", url: "https://zellic.io", desc: "Boutique blockchain security firm founded by CTF champions and researchers", tags: ["Boutique","CTF Champions","Research"], hq: "USA", founded: 2021 },
      { name: "PeckShield", url: "https://peckshield.com", desc: "Blockchain security company offering audits, monitoring and incident response", tags: ["Audits","Monitoring","Incident Response"], hq: "China", founded: 2018 },
      { name: "SlowMist", url: "https://slowmist.com", desc: "Blockchain security firm specializing in threat intelligence and asset tracking", tags: ["Threat Intelligence","Tracking","Asia"], hq: "China", founded: 2018 },
      { name: "Hexens", url: "https://hexens.io", desc: "Blockchain security boutique with expertise in ZK circuits and L2 protocols", tags: ["ZK","L2","Boutique"], hq: "USA", founded: 2021 },
      { name: "Nethermind", url: "https://nethermind.io", desc: "Ethereum core infrastructure team building clients, tools and research", tags: ["Ethereum Client","Infrastructure","Research"], hq: "UK", founded: 2017 },
      { name: "Offchain Labs (Arbitrum)", url: "https://offchainlabs.com", desc: "Builder of Arbitrum L2, the leading Ethereum rollup scaling solution", tags: ["Arbitrum","L2","Rollup"], hq: "USA", founded: 2018 },
      { name: "Optimism (OP Labs)", url: "https://optimism.io", desc: "Ethereum L2 with OP Stack enabling the Superchain vision of scalable rollups", tags: ["OP Stack","L2","Superchain"], hq: "USA", founded: 2019 },
      { name: "Matter Labs (zkSync)", url: "https://matter-labs.io", desc: "ZK rollup pioneers building zkSync Era for Ethereum scaling with ZK proofs", tags: ["ZK Rollup","zkSync","Scaling"], hq: "Germany", founded: 2018 },
      { name: "Polygon Labs", url: "https://polygon.technology", desc: "Multi-chain scaling ecosystem with PoS, zkEVM, CDK and Miden solutions", tags: ["Multi-Chain","zkEVM","CDK"], hq: "India", founded: 2017 },
      { name: "Ankr", url: "https://ankr.com", desc: "Decentralized Web3 infrastructure with RPC nodes, staking and AppChains", tags: ["RPC","Nodes","AppChains"], hq: "USA", founded: 2017 },
      { name: "Gelato Network", url: "https://gelato.network", desc: "Web3 automation network for smart contract execution and relay services", tags: ["Automation","Relay","Execution"], hq: "Switzerland", founded: 2019 },
      { name: "Biconomy", url: "https://biconomy.io", desc: "Account abstraction SDK enabling gasless transactions and smart accounts", tags: ["Account Abstraction","Gasless","SDK"], hq: "Singapore", founded: 2019 },
      { name: "Pyth Network", url: "https://pyth.network", desc: "High-fidelity oracle network delivering institutional-grade market data on-chain", tags: ["Oracle","Market Data","High-Fidelity"], hq: "USA", founded: 2021 },
      { name: "API3", url: "https://api3.org", desc: "First-party oracle solution connecting APIs directly to smart contracts", tags: ["First-Party","API","Oracle"], hq: "Global", founded: 2020 },
      { name: "Wormhole", url: "https://wormhole.com", desc: "Cross-chain messaging protocol enabling multi-chain dApp development", tags: ["Cross-Chain","Messaging","Multi-Chain"], hq: "USA", founded: 2020 },
      { name: "LayerZero", url: "https://layerzero.network", desc: "Omnichain interoperability protocol for cross-chain messaging and token transfers", tags: ["Omnichain","Interoperability","Messaging"], hq: "Canada", founded: 2021 },
      { name: "Axelar", url: "https://axelar.network", desc: "Universal cross-chain communication network connecting 50+ blockchains", tags: ["Cross-Chain","50+ Chains","Universal"], hq: "Canada", founded: 2020 },
      { name: "Hedera", url: "https://hedera.com", desc: "Enterprise-grade DLT with hashgraph consensus, governed by Fortune 500 council", tags: ["Hashgraph","Enterprise","Fortune 500"], hq: "USA", founded: 2018 },
      { name: "Avalanche (Ava Labs)", url: "https://avax.network", desc: "High-throughput blockchain platform with subnet architecture for custom chains", tags: ["Subnets","High-Throughput","Custom Chains"], hq: "USA", founded: 2019 },
      { name: "Solana Labs", url: "https://solana.com", desc: "High-performance blockchain with 400ms block times and low transaction costs", tags: ["High-Performance","400ms","Low-Cost"], hq: "USA", founded: 2018 },
      { name: "Tezos", url: "https://tezos.com", desc: "Self-amending blockchain with on-chain governance and formal verification", tags: ["Self-Amending","Governance","Formal Verification"], hq: "Switzerland", founded: 2017 },
      { name: "NEAR Protocol", url: "https://near.org", desc: "Sharded L1 with chain abstraction for user-friendly Web3 application development", tags: ["Sharded","Chain Abstraction","User-Friendly"], hq: "USA", founded: 2020 },
      { name: "Aptos Labs", url: "https://aptosfoundation.org", desc: "Move-based L1 blockchain built by former Meta/Diem team for scalable dApps", tags: ["Move","Ex-Meta","Scalable"], hq: "USA", founded: 2022 },
      { name: "Sui (Mysten Labs)", url: "https://sui.io", desc: "Object-centric L1 using Move language for parallel transaction execution", tags: ["Object-Centric","Move","Parallel"], hq: "USA", founded: 2021 },
      { name: "Starknet (StarkWare)", url: "https://starkware.co", desc: "ZK-STARK based L2 for Ethereum with provable computation and scalability", tags: ["ZK-STARK","L2","Provable"], hq: "Israel", founded: 2018 },
      { name: "Astar Network", url: "https://astar.network", desc: "Multi-chain smart contract hub for Polkadot with EVM and WASM support", tags: ["Polkadot","EVM","WASM"], hq: "Japan", founded: 2022 },
      { name: "Fuel Labs", url: "https://fuel.network", desc: "Modular execution layer with parallel processing and custom VM", tags: ["Modular","Parallel","Custom VM"], hq: "USA", founded: 2019 },
      { name: "Risc Zero", url: "https://risczero.com", desc: "General-purpose ZK virtual machine for verifiable off-chain computation", tags: ["ZK VM","Verifiable","Off-Chain"], hq: "USA", founded: 2021 },
      { name: "Eigen Labs (EigenLayer)", url: "https://eigenlayer.xyz", desc: "Restaking protocol enabling shared security for middleware and new chains", tags: ["Restaking","Shared Security","Middleware"], hq: "USA", founded: 2021 },
    ],
  },
  {
    id: "exchanges",
    name: "Exchanges & Distribution",
    icon: "📊",
    color: "#9B59B6",
    description: "Liquidity access, alternative trading systems, secondary market infrastructure, and distribution venues for tokenized assets",
    vendors: [
      { name: "Securitize Markets", url: "https://securitize.io", desc: "SEC-registered ATS for secondary trading of tokenized securities", tags: ["ATS","SEC","Secondary"], hq: "USA", founded: 2017 },
      { name: "tZERO", url: "https://tzero.com", desc: "Overstock-backed ATS for digital securities trading with broker-dealer license", tags: ["ATS","Broker-Dealer","Digital Securities"], hq: "USA", founded: 2014 },
      { name: "INX", url: "https://inx.co", desc: "SEC-regulated exchange for both digital securities and cryptocurrencies", tags: ["SEC","Dual Exchange","Regulated"], hq: "USA/Israel", founded: 2017 },
      { name: "ADDX", url: "https://addx.co", desc: "MAS-licensed private market exchange for accredited investor access to tokenized assets", tags: ["MAS","Private Markets","Accredited"], hq: "Singapore", founded: 2017 },
      { name: "Archax", url: "https://archax.com", desc: "FCA-regulated digital securities exchange, broker and custodian", tags: ["FCA","UK","Custodian"], hq: "UK", founded: 2018 },
      { name: "SDX (SIX)", url: "https://sdx.com", desc: "Swiss stock exchange's digital assets platform for institutional-grade trading", tags: ["SIX","Swiss","Institutional"], hq: "Switzerland", founded: 2018 },
      { name: "HKEX Digital", url: "https://hkex.com.hk", desc: "Hong Kong Stock Exchange digital asset initiatives and tokenized bond platform", tags: ["HKEX","Hong Kong","Bonds"], hq: "Hong Kong", founded: 1891 },
      { name: "OSE Digital (Japan)", url: "https://jpx.co.jp", desc: "Japan Exchange Group digital securities and tokenized asset initiatives", tags: ["Japan","JPX","Securities"], hq: "Japan", founded: 1878 },
      { name: "London Stock Exchange", url: "https://lseg.com", desc: "LSE digital asset trading and blockchain integration for capital markets", tags: ["LSE","London","Capital Markets"], hq: "UK", founded: 1801 },
      { name: "Deutsche Börse (D7)", url: "https://deutsche-boerse.com", desc: "D7 digital post-trade platform for tokenized securities issuance", tags: ["Deutsche Börse","D7","Post-Trade"], hq: "Germany", founded: 1992 },
      { name: "Euronext Digital", url: "https://euronext.com", desc: "Pan-European exchange exploring tokenized securities and digital infrastructure", tags: ["Pan-European","Securities","Infrastructure"], hq: "Netherlands", founded: 2000 },
      { name: "Oasis Pro Markets", url: "https://oasispro.com", desc: "SEC-registered ATS for multi-asset digital securities trading", tags: ["ATS","SEC","Multi-Asset"], hq: "USA", founded: 2020 },
      { name: "Tokeny Markets", url: "https://tokeny.com", desc: "Secondary market functionality for ERC-3643 tokenized securities", tags: ["ERC-3643","Secondary","Compliance"], hq: "Luxembourg", founded: 2017 },
      { name: "IX Swap", url: "https://ixswap.io", desc: "AMM-powered DEX for security tokens and real-world asset trading", tags: ["AMM","DEX","Security Tokens"], hq: "Liechtenstein", founded: 2021 },
      { name: "Swarm Markets", url: "https://swarm.com", desc: "BaFin-licensed DeFi exchange for trading tokenized stocks, bonds and commodities", tags: ["BaFin","DeFi","Stocks"], hq: "Germany", founded: 2018 },
      { name: "Prometheum", url: "https://prometheum.com", desc: "SEC-approved special purpose broker-dealer for digital asset securities", tags: ["SEC","Broker-Dealer","SPBD"], hq: "USA", founded: 2017 },
      { name: "Coinbase Prime", url: "https://prime.coinbase.com", desc: "Institutional trading platform with advanced execution and custody integration", tags: ["Institutional","Execution","Custody"], hq: "USA", founded: 2012 },
      { name: "Binance Institutional", url: "https://binance.com", desc: "World's largest crypto exchange with institutional OTC and custody services", tags: ["Largest","OTC","Global"], hq: "Global", founded: 2017 },
      { name: "Kraken Institutional", url: "https://kraken.com", desc: "Regulated exchange with institutional services, staking and futures trading", tags: ["Regulated","Staking","Futures"], hq: "USA", founded: 2011 },
      { name: "Bitstamp", url: "https://bitstamp.net", desc: "Europe's longest-running licensed crypto exchange for institutional traders", tags: ["Europe","Licensed","Oldest"], hq: "Luxembourg", founded: 2011 },
      { name: "Gemini", url: "https://gemini.com", desc: "NYDFS-regulated exchange with institutional custody and prime services", tags: ["NYDFS","Regulated","Prime"], hq: "USA", founded: 2014 },
      { name: "Crypto.com", url: "https://crypto.com", desc: "Global exchange with 100M+ users, institutional platform and DeFi wallet", tags: ["100M+ Users","Global","DeFi"], hq: "Singapore", founded: 2016 },
      { name: "OKX Institutional", url: "https://okx.com", desc: "Top-tier exchange with institutional trading, custody and DEX aggregator", tags: ["Institutional","DEX","Trading"], hq: "Seychelles", founded: 2017 },
      { name: "Bybit Institutional", url: "https://bybit.com", desc: "Major derivatives exchange with institutional account management and liquidity", tags: ["Derivatives","Institutional","Liquidity"], hq: "Dubai", founded: 2018 },
      { name: "Galaxy Digital", url: "https://galaxydigital.io", desc: "Digital asset merchant bank with trading, lending and investment management", tags: ["Merchant Bank","Trading","Lending"], hq: "USA", founded: 2018 },
      { name: "Cumberland (DRW)", url: "https://cumberland.io", desc: "DRW's crypto trading arm providing deep institutional OTC liquidity", tags: ["DRW","OTC","Liquidity"], hq: "USA", founded: 2014 },
      { name: "Jump Crypto", url: "https://jumpcrypto.com", desc: "Crypto arm of Jump Trading providing market making and infrastructure investment", tags: ["Market Making","Jump Trading","Infrastructure"], hq: "USA", founded: 2015 },
      { name: "Wintermute", url: "https://wintermute.com", desc: "Leading crypto market maker providing liquidity across CeFi and DeFi venues", tags: ["Market Making","DeFi","Liquidity"], hq: "UK", founded: 2017 },
      { name: "GSR Markets", url: "https://gsr.io", desc: "Crypto market maker and trading firm serving institutional clients since 2013", tags: ["Market Maker","Institutional","Since 2013"], hq: "UK", founded: 2013 },
      { name: "B2C2", url: "https://b2c2.com", desc: "SBI-owned institutional crypto market maker with 24/7 electronic trading", tags: ["SBI","24/7","Electronic"], hq: "UK", founded: 2015 },
      { name: "Amber Group", url: "https://ambergroup.io", desc: "Crypto finance platform offering institutional trading, lending and treasury", tags: ["Finance","Trading","Treasury"], hq: "Singapore", founded: 2017 },
      { name: "Keyrock", url: "https://keyrock.eu", desc: "European crypto market maker with algorithmic trading for digital assets", tags: ["European","Algorithmic","Market Making"], hq: "Belgium", founded: 2017 },
      { name: "Flowdesk", url: "https://flowdesk.co", desc: "Crypto market maker specializing in token listing support and liquidity provision", tags: ["Token Listing","Liquidity","Market Making"], hq: "France", founded: 2020 },
      { name: "FalconX", url: "https://falconx.io", desc: "Institutional crypto trading and credit platform with zero-fee trading model", tags: ["Zero-Fee","Credit","Institutional"], hq: "USA", founded: 2018 },
      { name: "Talos", url: "https://talos.com", desc: "Institutional crypto trading technology platform with OMS and EMS", tags: ["OMS/EMS","Technology","Institutional"], hq: "USA", founded: 2018 },
      { name: "Apex Group", url: "https://apexgroup.com", desc: "Fund administration with digital asset services and Tokeny integration", tags: ["Fund Admin","Tokeny","Services"], hq: "Bermuda", founded: 2003 },
      { name: "Maple Finance", url: "https://maple.finance", desc: "Institutional lending protocol enabling on-chain credit market participation", tags: ["Lending","Credit","On-Chain"], hq: "Australia", founded: 2020 },
      { name: "Tradeweb", url: "https://tradeweb.com", desc: "Leading fixed income electronic trading platform exploring tokenized bonds", tags: ["Fixed Income","Electronic","Bonds"], hq: "USA", founded: 1996 },
      { name: "MarketAxess", url: "https://marketaxess.com", desc: "Electronic bond trading platform investigating tokenized fixed income products", tags: ["Bonds","Electronic","Fixed Income"], hq: "USA", founded: 2000 },
      { name: "ICE (Bakkt)", url: "https://ice.com", desc: "Intercontinental Exchange with Bakkt digital asset platform", tags: ["ICE","Bakkt","Infrastructure"], hq: "USA", founded: 2000 },
      { name: "Nasdaq Digital Assets", url: "https://nasdaq.com", desc: "Nasdaq's digital asset custody and exchange technology licensing", tags: ["Nasdaq","Technology","Licensing"], hq: "USA", founded: 1971 },
      { name: "Broadridge DLT", url: "https://broadridge.com", desc: "DLT-based repo and securities platform processing $50B+ daily", tags: ["DLT","Repo","$50B+ Daily"], hq: "USA", founded: 2007 },
      { name: "DTCC Digital", url: "https://dtcc.com", desc: "Post-trade infrastructure exploring tokenized securities settlement", tags: ["Post-Trade","Settlement","DTCC"], hq: "USA", founded: 1999 },
      { name: "JPM Onyx", url: "https://jpmorgan.com/onyx", desc: "JP Morgan's blockchain platform for tokenized deposits and repo", tags: ["JPMorgan","Tokenized Deposits","Repo"], hq: "USA", founded: 2020 },
      { name: "Goldman Sachs GS DAP", url: "https://goldmansachs.com", desc: "Goldman's digital asset platform for tokenized bond issuance", tags: ["Goldman Sachs","Bonds","Institutional"], hq: "USA", founded: 2022 },
      { name: "Citi Token Services", url: "https://citi.com", desc: "Citi's blockchain-based tokenization services for trade finance and cash", tags: ["Citi","Trade Finance","Cash"], hq: "USA", founded: 2023 },
      { name: "HSBC Orion", url: "https://hsbc.com", desc: "HSBC's tokenized gold and bond platform using distributed ledger technology", tags: ["HSBC","Gold","Bonds"], hq: "UK", founded: 2023 },
      { name: "UBS Tokenize", url: "https://ubs.com", desc: "UBS tokenized bond and structured product issuance on Ethereum", tags: ["UBS","Structured Products","Ethereum"], hq: "Switzerland", founded: 2022 },
      { name: "Franklin OnChain", url: "https://franklintempleton.com", desc: "Franklin Templeton's on-chain registered fund with $700M+ tokenized", tags: ["Franklin Templeton","$700M+","Fund"], hq: "USA", founded: 2021 },
      { name: "WisdomTree Prime", url: "https://wisdomtree.com", desc: "Blockchain-native fund platform for tokenized treasuries and gold", tags: ["Tokenized Fund","Treasuries","Gold"], hq: "USA", founded: 2022 },
    ],
  },
  {
    id: "marketing",
    name: "Marketing & PR",
    icon: "📢",
    color: "#E74C3C",
    description: "Strategic marketing, public relations, community management, and growth agencies specialized in Web3 and digital asset projects",
    vendors: [
      { name: "Brands Essential", url: "https://www.brands-essential.com/", desc: "Boutique B2B marketing consultancy specializing in fintech, RWA tokenization, and Web3 go-to-market strategy with deep ABM and cold outreach expertise", tags: ["Fintech","RWA","ABM","GTM Strategy"], hq: "Hong Kong", founded: 2024 },
      { name: "Coinbound", url: "https://coinbound.io", desc: "900+ clients, 500+ KOL network, 90% retention rate, leading Web3 marketing agency", tags: ["900+ Clients","KOL Network","Growth"], hq: "USA", founded: 2018 },
      { name: "NinjaPromo", url: "https://ninjapromo.io", desc: "Creative-led B2B Web3 agency working with Binance, Crypto.com, HTX and OKX", tags: ["B2B","Creative","Exchanges"], hq: "USA", founded: 2017 },
      { name: "Lunar Strategy", url: "https://lunarstrategy.com", desc: "Full-stack Web3 marketing with paid acquisition, SEO and community growth", tags: ["Full-Stack","SEO","Paid Ads"], hq: "Netherlands", founded: 2019 },
      { name: "EAK Digital", url: "https://eakdigital.com", desc: "Most awarded blockchain PR agency with Nike, Rolls Royce and HSBC background", tags: ["PR","Awarded","Cross-Industry"], hq: "UK", founded: 2018 },
      { name: "MarketAcross", url: "https://marketacross.com", desc: "Blockchain PR + SEO agency with tier-one crypto media placements", tags: ["PR","SEO","Media Placement"], hq: "Israel", founded: 2014 },
      { name: "Blockwiz", url: "https://blockwiz.com", desc: "Award-winning Web3 agency with end-to-end execution including influencers", tags: ["End-to-End","Influencer","Award-Winning"], hq: "India", founded: 2019 },
      { name: "CrowdCreate", url: "https://crowdcreate.us", desc: "Blockchain marketing and investor relations agency since 2016", tags: ["Investor Relations","Since 2016","Fundraising"], hq: "USA", founded: 2016 },
      { name: "RGray", url: "https://rgray.co", desc: "Brand identity and design-first Web3 agency for OKX, Bybit and Huobi", tags: ["Branding","Design","Identity"], hq: "USA", founded: 2019 },
      { name: "ReBlonde", url: "https://reblonde.com", desc: "Israel-based agency bridging AI, fintech and Web3 PR with mainstream media", tags: ["AI + Web3","Fintech","PR"], hq: "Israel", founded: 2015 },
      { name: "Omni Agency", url: "https://omniagency.ca", desc: "Toronto-based Web3 community builder for crypto, NFT and dApp projects", tags: ["Community","Toronto","dApps"], hq: "Canada", founded: 2020 },
      { name: "ICODA", url: "https://icoda.io", desc: "Crypto marketing specializing in Asia market expansion and regional influencers", tags: ["Asia","Regional","Token Promotion"], hq: "Estonia", founded: 2017 },
      { name: "Melrose PR", url: "https://melrosepr.com", desc: "Crypto and blockchain PR firm with earned media placements in top publications", tags: ["PR","Earned Media","Publications"], hq: "USA", founded: 2012 },
      { name: "Rehab Agency", url: "https://rehab.agency", desc: "Growth-focused Web3 agency supporting breakthrough crypto concepts", tags: ["Growth","Breakthrough","Strategy"], hq: "UK", founded: 2019 },
      { name: "X10 Agency", url: "https://x10.agency", desc: "Web3 growth agency specializing in token launches and DeFi marketing", tags: ["Token Launch","DeFi","Growth"], hq: "USA", founded: 2019 },
      { name: "Simple Grain", url: "https://simplegrain.com", desc: "Video-forward crypto marketing agency with high-end creative production", tags: ["Video","Creative","Production"], hq: "USA", founded: 2020 },
      { name: "Surgence Labs", url: "https://surgencelabs.com", desc: "Web3 native marketing agency with community-first growth strategies", tags: ["Community-First","Native","Growth"], hq: "USA", founded: 2021 },
      { name: "GuerrillaBuzz", url: "https://guerrillabuzz.com", desc: "Community-driven blockchain SEO and content marketing agency", tags: ["SEO","Content","Community"], hq: "Israel", founded: 2017 },
      { name: "Coinpresso", url: "https://coinpresso.io", desc: "Data-driven crypto SEO boutique with exchange and token optimization", tags: ["SEO","Data-Driven","Boutique"], hq: "UK", founded: 2019 },
      { name: "Mintfunnel", url: "https://mintfunnel.com", desc: "Crypto press release distribution to CoinTelegraph, Benzinga and Yahoo Finance from $99", tags: ["Press Release","$99","Distribution"], hq: "USA", founded: 2021 },
      { name: "Cointelegraph Marketing", url: "https://cointelegraph.com", desc: "Advertising and sponsored content on the world's leading crypto media platform", tags: ["Media","Sponsored","Content"], hq: "Global", founded: 2013 },
      { name: "Chainwire", url: "https://chainwire.org", desc: "Blockchain-native press release distribution network with 200+ media outlets", tags: ["Wire Service","200+ Outlets","Distribution"], hq: "USA", founded: 2021 },
      { name: "Bitcoin PR Buzz", url: "https://bitcoinprbuzz.com", desc: "Pioneer crypto press release distribution service since 2013", tags: ["Pioneer","Since 2013","PR"], hq: "USA", founded: 2013 },
      { name: "Wachsman", url: "https://wachsman.com", desc: "Global blockchain communications firm with offices in NYC, Dublin and Singapore", tags: ["Global","Communications","Multi-Office"], hq: "USA/Ireland", founded: 2015 },
      { name: "Transform Group", url: "https://transformgroup.com", desc: "Crypto community management and marketing with ex-Fortune 500 strategists", tags: ["Community","Fortune 500","Strategy"], hq: "USA", founded: 2017 },
      { name: "Serotonin", url: "https://serotonin.co", desc: "Web3 marketing and communications agency with product strategy capabilities", tags: ["Product Strategy","Communications","Web3"], hq: "USA", founded: 2021 },
      { name: "Luna PR", url: "https://lunapr.io", desc: "Dubai-based blockchain PR agency working with 500+ crypto companies", tags: ["Dubai","500+ Clients","PR"], hq: "UAE", founded: 2017 },
      { name: "Cryptovirally", url: "https://cryptovirally.com", desc: "Self-service crypto marketing platform with instant PR and social media packages", tags: ["Self-Service","Instant","Packages"], hq: "Romania", founded: 2020 },
      { name: "TokenMinds", url: "https://tokenminds.co", desc: "Full-service Web3 agency covering development, marketing and community building", tags: ["Full-Service","Development","Community"], hq: "Singapore", founded: 2018 },
      { name: "AmaZix", url: "https://amazix.com", desc: "Blockchain community management and social media agency for token projects", tags: ["Community","Social Media","Tokens"], hq: "Netherlands", founded: 2016 },
      { name: "Fintech5", url: "https://fintech5.com", desc: "Blockchain marketing agency specialized in fintech and DeFi go-to-market", tags: ["Fintech","DeFi","GTM"], hq: "USA", founded: 2019 },
      { name: "Blockchain PR", url: "https://blockchainpr.com", desc: "Dedicated blockchain PR firm with media relations across crypto and TradFi", tags: ["PR","Media Relations","TradFi"], hq: "USA", founded: 2017 },
      { name: "Coinzilla", url: "https://coinzilla.com", desc: "Crypto advertising network serving display ads across 800+ blockchain websites", tags: ["Ad Network","Display","800+ Sites"], hq: "Romania", founded: 2016 },
      { name: "Bitmedia", url: "https://bitmedia.io", desc: "Crypto ad network with targeted display, native and video advertising", tags: ["Ad Network","Targeting","Video"], hq: "Global", founded: 2015 },
      { name: "Brave Ads", url: "https://brave.com/brave-ads", desc: "Privacy-preserving crypto-native ad platform with 70M+ monthly active users", tags: ["Privacy","70M+ Users","Native Ads"], hq: "USA", founded: 2019 },
      { name: "Collab.Land", url: "https://collab.land", desc: "Token-gated community management for Discord and Telegram", tags: ["Token-Gated","Discord","Telegram"], hq: "USA", founded: 2020 },
      { name: "Galxe", url: "https://galxe.com", desc: "Web3 community engagement platform with quest campaigns and credential infrastructure", tags: ["Quests","Credentials","Engagement"], hq: "USA", founded: 2021 },
      { name: "Zealy", url: "https://zealy.io", desc: "Community quest platform helping Web3 projects drive engagement and retention", tags: ["Quests","Retention","Community"], hq: "Belgium", founded: 2022 },
      { name: "Layer3", url: "https://layer3.xyz", desc: "Web3 quest platform with on-chain credentials and multi-chain bounty campaigns", tags: ["Quests","On-Chain","Bounties"], hq: "USA", founded: 2021 },
      { name: "Dune Analytics", url: "https://dune.com", desc: "Blockchain analytics platform for creating and sharing on-chain data dashboards", tags: ["Analytics","Dashboards","On-Chain"], hq: "Norway", founded: 2018 },
      { name: "Nansen", url: "https://nansen.ai", desc: "On-chain analytics platform with wallet labeling and smart money tracking", tags: ["Analytics","Smart Money","Wallets"], hq: "Singapore", founded: 2019 },
      { name: "DappRadar", url: "https://dappradar.com", desc: "dApp discovery and analytics platform tracking usage across 50+ chains", tags: ["dApp Discovery","50+ Chains","Analytics"], hq: "Lithuania", founded: 2018 },
      { name: "DefiLlama", url: "https://defillama.com", desc: "Leading open-source DeFi TVL aggregator and analytics dashboard", tags: ["Open Source","TVL","DeFi"], hq: "Global", founded: 2020 },
      { name: "Messari", url: "https://messari.io", desc: "Crypto research and intelligence platform for institutional data and reporting", tags: ["Research","Intelligence","Institutional"], hq: "USA", founded: 2018 },
      { name: "The Block Research", url: "https://theblock.co", desc: "Institutional-grade crypto research, data and news for market participants", tags: ["Research","News","Data"], hq: "USA", founded: 2018 },
      { name: "Bankless Consulting", url: "https://banklessconsulting.com", desc: "DAO and Web3 consulting arm of the Bankless media ecosystem", tags: ["DAO","Consulting","Bankless"], hq: "USA", founded: 2022 },
      { name: "a]i/ Research", url: "https://airesearch.com", desc: "Digital asset research and advisory for institutional investors and protocols", tags: ["Research","Advisory","Institutional"], hq: "USA", founded: 2020 },
      { name: "Paradigm (Marketing)", url: "https://paradigm.co", desc: "Crypto-native venture firm whose portfolio support drives ecosystem growth", tags: ["VC","Portfolio Support","Ecosystem"], hq: "USA", founded: 2018 },
      { name: "Dragonfly Capital", url: "https://dragonfly.xyz", desc: "Crypto fund providing portfolio companies with marketing and growth support", tags: ["Fund","Growth Support","Portfolio"], hq: "USA", founded: 2018 },
      { name: "Framework Ventures", url: "https://framework.ventures", desc: "Crypto venture fund with active operational support for portfolio companies", tags: ["VC","Operations","Support"], hq: "USA", founded: 2019 },
      { name: "Electric Capital", url: "https://electriccapital.com", desc: "Developer-focused crypto fund producing annual developer reports", tags: ["Developer","Reports","Fund"], hq: "USA", founded: 2018 },
    ],
  },
];

const TOTAL_VENDORS = CATEGORIES.reduce((sum, c) => sum + c.vendors.length, 0);

export default function FluidRWAEcosystem() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [hoveredCat, setHoveredCat] = useState(null);
  const [showStats, setShowStats] = useState(true);
  const canvasRef = useRef(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        color: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].color,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "40";
        ctx.fill();
        particles.slice(i + 1).forEach(q => {
          const dx = p.x - q.x, dy = p.y - q.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color + Math.floor((1 - dist / 120) * 25).toString(16).padStart(2, "0");
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const filteredVendors = useMemo(() => {
    let vendors = activeCategory
      ? CATEGORIES.find(c => c.id === activeCategory)?.vendors || []
      : CATEGORIES.flatMap(c => c.vendors.map(v => ({ ...v, categoryId: c.id, categoryColor: c.color, categoryName: c.name })));

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      vendors = vendors.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.desc.toLowerCase().includes(q) ||
        v.tags.some(t => t.toLowerCase().includes(q)) ||
        (v.hq && v.hq.toLowerCase().includes(q))
      );
    }

    if (sortBy === "name") vendors.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "founded") vendors.sort((a, b) => (a.founded || 9999) - (b.founded || 9999));
    else if (sortBy === "hq") vendors.sort((a, b) => (a.hq || "").localeCompare(b.hq || ""));

    return vendors;
  }, [activeCategory, searchQuery, sortBy]);

  const activeCatObj = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div style={{
      fontFamily: "'Outfit', 'DM Sans', sans-serif",
      background: "#0a0e17",
      color: "#e8e8e8",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />

      {/* Gradient orbs */}
      <div style={{ position: "fixed", top: "-200px", right: "-200px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-300px", left: "-200px", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle, rgba(123,104,238,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "20px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", padding: "40px 20px 30px", marginBottom: "20px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <img src="https://raw.githubusercontent.com/shefalishm/public/main/FluidRWA%20Favicon.png" alt="FluidRWA" style={{ height: "48px", width: "48px", borderRadius: "12px", objectFit: "contain" }} />
            <span style={{ fontSize: "14px", letterSpacing: "4px", textTransform: "uppercase", color: "#00D4AA", fontWeight: 600 }}>FluidRWA</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 12px", background: "linear-gradient(135deg, #ffffff 0%, #00D4AA 50%, #7B68EE 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Digital Asset Vendor Ecosystem
          </h1>
          <p style={{ fontSize: "16px", color: "#8899aa", maxWidth: "700px", margin: "0 auto 20px", lineHeight: 1.6 }}>
            {TOTAL_VENDORS} verified vendors across {CATEGORIES.length} categories powering the real-world asset tokenization industry
          </p>

          {/* Stats bar */}
          {showStats && (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginBottom: "24px" }}>
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => { setActiveCategory(activeCategory === c.id ? null : c.id); setSelectedVendor(null); }}
                  onMouseEnter={() => setHoveredCat(c.id)} onMouseLeave={() => setHoveredCat(null)}
                  style={{
                    background: activeCategory === c.id ? c.color + "20" : hoveredCat === c.id ? "#ffffff08" : "#ffffff05",
                    border: `1px solid ${activeCategory === c.id ? c.color + "60" : "#ffffff10"}`,
                    borderRadius: "12px", padding: "10px 16px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "8px", color: "#e8e8e8",
                    transition: "all 0.3s", transform: hoveredCat === c.id ? "translateY(-2px)" : "none",
                    boxShadow: activeCategory === c.id ? `0 4px 20px ${c.color}20` : "none",
                  }}>
                  <span style={{ fontSize: "16px" }}>{c.icon}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap" }}>{c.name.split("&")[0].trim()}</span>
                  <span style={{ fontSize: "11px", background: c.color + "30", color: c.color, padding: "2px 8px", borderRadius: "20px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{c.vendors.length}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search + Controls */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", flex: "1 1 300px", maxWidth: "500px" }}>
              <input
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search vendors, tags, headquarters..."
                style={{
                  width: "100%", padding: "12px 16px 12px 42px", borderRadius: "12px",
                  border: "1px solid #ffffff15", background: "#ffffff08", color: "#e8e8e8",
                  fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                }}
              />
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#667788", fontSize: "16px" }}>⌕</span>
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid #ffffff15", background: "#ffffff08", color: "#e8e8e8", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
              <option value="name">Sort: A-Z</option>
              <option value="founded">Sort: Founded</option>
              <option value="hq">Sort: HQ</option>
            </select>
            <div style={{ display: "flex", borderRadius: "12px", border: "1px solid #ffffff15", overflow: "hidden" }}>
              {["grid", "table"].map(m => (
                <button key={m} onClick={() => setViewMode(m)}
                  style={{ padding: "10px 16px", background: viewMode === m ? "#00D4AA20" : "transparent", border: "none", color: viewMode === m ? "#00D4AA" : "#667788", cursor: "pointer", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", fontFamily: "inherit" }}>
                  {m === "grid" ? "◫ Cards" : "☰ Table"}
                </button>
              ))}
            </div>
          </div>

          {activeCategory && (
            <div style={{ marginTop: "16px", padding: "12px 20px", background: activeCatObj.color + "10", border: `1px solid ${activeCatObj.color}30`, borderRadius: "12px", maxWidth: "700px", margin: "16px auto 0" }}>
              <span style={{ color: activeCatObj.color, fontWeight: 700, fontSize: "14px" }}>{activeCatObj.icon} {activeCatObj.name}</span>
              <span style={{ color: "#8899aa", fontSize: "13px", marginLeft: "8px" }}>— {activeCatObj.description}</span>
              <button onClick={() => { setActiveCategory(null); setSelectedVendor(null); }} style={{ marginLeft: "12px", background: "none", border: "1px solid #ffffff20", color: "#8899aa", padding: "2px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontFamily: "inherit" }}>✕ Clear</button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div style={{ padding: "0 8px 12px", color: "#667788", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
          {filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""} found
          {searchQuery && <span> for "<span style={{ color: "#00D4AA" }}>{searchQuery}</span>"</span>}
        </div>

        {/* Vendor modal */}
        {selectedVendor && (
          <div onClick={() => setSelectedVendor(null)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(8px)" }}>
            <div onClick={e => e.stopPropagation()} style={{ background: "linear-gradient(145deg, #141a28, #0d1220)", border: "1px solid #ffffff15", borderRadius: "20px", padding: "32px", maxWidth: "560px", width: "100%", maxHeight: "80vh", overflow: "auto", boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${(selectedVendor.categoryColor || "#00D4AA")}10` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 4px", color: "#fff" }}>{selectedVendor.name}</h2>
                  {selectedVendor.categoryName && <span style={{ fontSize: "11px", color: selectedVendor.categoryColor, background: selectedVendor.categoryColor + "15", padding: "3px 10px", borderRadius: "20px", fontWeight: 600 }}>{selectedVendor.categoryName}</span>}
                </div>
                <button onClick={() => setSelectedVendor(null)} style={{ background: "#ffffff10", border: "none", color: "#8899aa", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}>✕</button>
              </div>
              <p style={{ color: "#b0bec5", lineHeight: 1.7, fontSize: "14px", margin: "0 0 20px" }}>{selectedVendor.desc}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div style={{ background: "#ffffff05", borderRadius: "12px", padding: "12px" }}>
                  <div style={{ fontSize: "10px", color: "#667788", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Headquarters</div>
                  <div style={{ fontSize: "14px", fontWeight: 600 }}>{selectedVendor.hq || "Global"}</div>
                </div>
                <div style={{ background: "#ffffff05", borderRadius: "12px", padding: "12px" }}>
                  <div style={{ fontSize: "10px", color: "#667788", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Founded</div>
                  <div style={{ fontSize: "14px", fontWeight: 600 }}>{selectedVendor.founded || "N/A"}</div>
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "10px", color: "#667788", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Specializations</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedVendor.tags.map((t, i) => (
                    <span key={i} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "20px", background: "#ffffff08", border: "1px solid #ffffff10", color: "#b0bec5" }}>{t}</span>
                  ))}
                </div>
              </div>
              <a href={selectedVendor.url} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: "12px", background: "linear-gradient(135deg, #00D4AA, #7B68EE)", color: "#0a0e17", fontWeight: 700, fontSize: "14px", textDecoration: "none", transition: "transform 0.2s" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.02)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"}>
                Visit Website →
              </a>
            </div>
          </div>
        )}

        {/* Grid view */}
        {viewMode === "grid" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px", padding: "0 0 40px" }}>
            {filteredVendors.map((v, i) => {
              const color = v.categoryColor || (activeCatObj ? activeCatObj.color : "#00D4AA");
              return (
                <div key={i} onClick={() => setSelectedVendor(v)}
                  style={{
                    background: "linear-gradient(145deg, #141a28, #0d1220)",
                    border: "1px solid #ffffff0a", borderRadius: "14px", padding: "18px",
                    cursor: "pointer", transition: "all 0.3s",
                    position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = color + "40"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${color}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#ffffff0a"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.5 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "#fff" }}>{v.name}</h3>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
                      {v.founded && <span style={{ fontSize: "10px", color: "#667788", fontFamily: "'JetBrains Mono', monospace" }}>{v.founded}</span>}
                      <span style={{ fontSize: "10px", color: "#667788", background: "#ffffff08", padding: "2px 6px", borderRadius: "4px" }}>{v.hq}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "12px", color: "#8899aa", margin: "0 0 12px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{v.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {v.tags.slice(0, 3).map((t, j) => (
                      <span key={j} style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", background: color + "12", color: color, fontWeight: 500, border: `1px solid ${color}20` }}>{t}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table view */}
        {viewMode === "table" && (
          <div style={{ overflowX: "auto", borderRadius: "14px", border: "1px solid #ffffff0a", marginBottom: "40px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#ffffff06" }}>
                  <th style={{ textAlign: "left", padding: "12px 16px", color: "#667788", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #ffffff0a" }}>Vendor</th>
                  {!activeCategory && <th style={{ textAlign: "left", padding: "12px 16px", color: "#667788", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #ffffff0a" }}>Category</th>}
                  <th style={{ textAlign: "left", padding: "12px 16px", color: "#667788", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #ffffff0a" }}>Description</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", color: "#667788", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #ffffff0a" }}>HQ</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", color: "#667788", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #ffffff0a" }}>Founded</th>
                  <th style={{ textAlign: "left", padding: "12px 16px", color: "#667788", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid #ffffff0a" }}>Link</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((v, i) => {
                  const color = v.categoryColor || (activeCatObj ? activeCatObj.color : "#00D4AA");
                  return (
                    <tr key={i} onClick={() => setSelectedVendor(v)}
                      style={{ borderBottom: "1px solid #ffffff06", cursor: "pointer", transition: "background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#ffffff05"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "10px 16px", fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>{v.name}</td>
                      {!activeCategory && <td style={{ padding: "10px 16px" }}><span style={{ fontSize: "10px", color: color, background: color + "15", padding: "2px 8px", borderRadius: "10px" }}>{v.categoryName?.split("&")[0].trim()}</span></td>}
                      <td style={{ padding: "10px 16px", color: "#8899aa", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.desc}</td>
                      <td style={{ padding: "10px 16px", color: "#8899aa" }}>{v.hq}</td>
                      <td style={{ padding: "10px 16px", color: "#667788", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>{v.founded}</td>
                      <td style={{ padding: "10px 16px" }}><a href={v.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ color: "#00D4AA", textDecoration: "none", fontSize: "12px" }}>↗</a></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filteredVendors.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#667788" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⌕</div>
            <p style={{ fontSize: "16px" }}>No vendors match your search. Try different keywords.</p>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "40px 20px", borderTop: "1px solid #ffffff0a", marginTop: "20px" }}>
          <p style={{ color: "#8899aa", fontSize: "14px", margin: "0 0 12px" }}>
            Want to get your company listed? Email us at{" "}
            <a href="mailto:contact@fluidrwa.com" style={{ color: "#00D4AA", textDecoration: "none", fontWeight: 600 }}>contact@fluidrwa.com</a>
          </p>
          <p style={{ color: "#445566", fontSize: "12px", margin: 0 }}>
            © 2026 <a href="https://www.fluidrwa.com" target="_blank" rel="noopener noreferrer" style={{ color: "#667788", textDecoration: "none" }}>FluidRWA</a>. All Rights Reserved. | {TOTAL_VENDORS} vendors across {CATEGORIES.length} categories
          </p>
        </div>
      </div>
    </div>
  );
}
